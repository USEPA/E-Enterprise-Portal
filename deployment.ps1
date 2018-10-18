param (
    [string]$src_overide = "",
    [string]$dest_overide = "",
    [string]$env = "local",
    #[Parameter(Mandatory=$true,HelpMessage="Select a mode: (install|update)")][string]$mode,
    [Parameter(Mandatory=$true,HelpMessage="Which files to update: (project|vendor|all)")][string]$updatetype
    # [Parameter(Mandatory=$true,HelpMessage="Just dry run the robocopy? (true|false)")][bool]$dryRun
)

# dot source the environment variables
. ./settings.all.ps1
. ./settings.$env.ps1

# Do overides
if ($src_overide) {
    $src = $src_overide;
}

if ($dest_overide) {
    $dest = $dest_overide;
}

$list = '/l'
if (!$dryRun) {
    $list = '';
}

Function Make-Blacklist() {
    param ([string]$blacklistfile)
    $output = ''
    foreach($line in Get-Content $blacklistfile) {
        if($line -match $regex){
            If (!($output -eq '')) {
                $output = "$output `"$line`""
            } Else {
                $output = "`"$line`""
            }
        }
    }
    $output
    return
}

# Mode Install (all files)
# Needs work: convert to .zip
<#if (($mode -eq 'install')) {
    # Over write variables
    . ./settings.all.ps1

    $dirs = Make-Blacklist ($excluded_folders)
    $files = Make-Blacklist ($excluded_files)

    robocopy "$src" "$dest" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$updatetype.log /xd $dirs /xf $files $list
    echo "robocopy `"$src`" `"$dest`" /mir /nocopy /is /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$updatetype.log /xd $dirs /xf $files $list"
}#>

# Mode Update
if (($mode -eq 'update')) {
    # Project Files
    if (($updatetype -eq 'project')) {

        $dirs = Make-Blacklist ($excluded_folders)
        $files = Make-Blacklist ($excluded_files)

        robocopy "$src" "$dest" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$updatetype.log /xd $dirs /xf $files $list
        echo "robocopy `"$src`" `"$dest`" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$updatetype.log /xd $dirs /xf $files $list"
    }

    # Vendor Files
    if (($updatetype -eq 'vendor')) {
        foreach($folder in $vendor_folders -split ' ') {
            $machine = $folder -replace '/','_'
            robocopy "$folder" "$dest" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$updatetype-$machine.log $list
            echo "robocopy `"$folder`" `"$dest`" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$updatetype-$machine.log $list"
        }
    }

    # All Files
    if (($updatetype -eq 'all')) {
        # Override with the simplest
        . ./settings.all.ps1

        $dirs = Make-Blacklist ($excluded_folders)
        $files = Make-Blacklist ($excluded_files)

        robocopy "$src" "$dest" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$updatetype.log /xd $dirs /xf $files $list
        echo "robocopy `"$src`" `"$dest`" /mir /nocopy /copy:dt /dcopy:t /r:3 /w:3 /tee /log:robocopy-$mode-$updatetype.log /xd $dirs /xf $files $list"
    }
}