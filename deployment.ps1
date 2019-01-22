param (
    [string]$src_overide = "",
    [string]$dest_overide = "",
    [string]$env = "local",
    [Parameter(Mandatory=$true,HelpMessage="Select a mode: (install|update)")][string]$mode,
    [Parameter(Mandatory=$true,HelpMessage="Which files to update: (project|vendor|all)")][string]$target,
    [Parameter(Mandatory=$true,HelpMessage="Just dry run the robocopy? (true|false)")][bool]$whatIf
)

# dot source the environment variables
. ./settings.all.ps1
. ./settings.$env.ps1
$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition

# Do overides
if ($src_overide) {
    $src = $src_overide;
}

if ($dest_overide) {
    $dest = $dest_overide;
}

$list = '/l'
if (!$whatIf) {
    $list = '';
}

Function Make-Blacklist() {
    param ([string]$blacklistfile)
    $rootPath = "$scriptPath\"
    $output = ''
    foreach($line in Get-Content $blacklistfile) {
        if($line -match $regex){
            $modified_line = $line -replace "\.\\", $rootPath
            If (!($output -eq '')) {
                $output = "$output `"$modified_line`""
            } Else {
                $output = "`"$modified_line`""
            }
        }
    }

    return $output
}

Function Make-Path-Absolute() {
    param ([string]$relativePath)
    # Resolve-Path ()

    $scriptPath = split-path -parent $MyInvocation.MyCommand.Definition
    $rootPath = "$scriptPath\"
    $modified_line = $relativePath -replace "\.\\", $rootPath

    $modified_line
    return $modified_line
}

# Mode Install (all files)
# Needs work: convert to .zip
if (($mode -eq 'install')) {
    # Over write variables
    . ./settings.all.ps1

    $dirs = Make-Blacklist ($excluded_folders)
    $files = Make-Blacklist ($excluded_files)

    robocopy "$src" "$dest" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$target.log /xd $dirs /xf $files $list
    Write-Output "robocopy `"$src`" `"$dest`" /mir /nocopy /is /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$target.log /xd $dirs /xf $files $list"
}

# Mode Update
if (($mode -eq 'update')) {
    # Project Files
    if (($target -eq 'project')) {

        $dirs = Make-Blacklist ($excluded_folders)
        $files = Make-Blacklist ($excluded_files)

        robocopy "$src" "$dest" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$target.log /xd $dirs /xf $files $list
        Write-Output "robocopy `"$src`" `"$dest`" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$target.log /xd $dirs /xf $files $list"
    }

    # Vendor Files
    if (($target -eq 'vendor')) {
        foreach($folder in $vendor_folders -split ' ') {
            $machine = $folder -replace '/','_'
            robocopy "$folder" "$dest" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$target-$machine.log $list
            Write-Output "robocopy `"$folder`" `"$dest`" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$target-$machine.log $list"
        }
    }

    # All Files
    if (($target -eq 'all')) {
        # Override with the simplest
        . ./settings.all.ps1

        $dirs = Make-Blacklist ($excluded_folders)
        $files = Make-Blacklist ($excluded_files)

        robocopy "$src" "$dest" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$target.log /xd $dirs /xf $files $list
        Write-Output "robocopy `"$src`" `"$dest`" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$target.log /xd $dirs /xf $files $list"
    }
}

function Exit-With-Code
{
    param
    (
        $exitcode
    )

    $host.SetShouldExit($exitcode)
    exit
}

Exit-With-Code(0)