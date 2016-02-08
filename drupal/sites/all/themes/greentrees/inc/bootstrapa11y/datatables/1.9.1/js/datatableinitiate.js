function restoreRow ( oTable, nRow )
{
    var aData = oTable.fnGetData(nRow);
    var selTr = $(nRow);
    selTr.removeClass("row_selected");
	var jqTds = $('>td', nRow);
	
	for ( var i=0, iLen=jqTds.length ; i<iLen ; i++ ) {
		oTable.fnUpdate( aData[i], nRow, i, false );
	}
	
	oTable.fnDraw();
}

function editRow ( oTable, nRow )
{
    var aData = oTable.fnGetData(nRow);
    var selTr = $(nRow);
    selTr.addClass("row_selected");
	var jqTds = $('>td', nRow);
	var jqThs = $('>thead>tr>th', oTable);
	var rowIndex = $(nRow).prop('rowIndex');
	jqTds[0].innerHTML = '<input type="text" value="'+aData[0]+'" title="'+ jqThs.eq(0).attr('abbr') +' row '+ rowIndex +'">';
	jqTds[1].innerHTML = '<input type="text" value="'+aData[1]+'" title="'+ jqThs.eq(1).attr('abbr') +' row '+ rowIndex +'">';
	jqTds[2].innerHTML = '<input type="text" value="'+aData[2]+'" title="'+ jqThs.eq(2).attr('abbr') +' row '+ rowIndex +'">';
	jqTds[3].innerHTML = '<input type="text" value="'+aData[3]+'" title="'+ jqThs.eq(3).attr('abbr') +' row '+ rowIndex +'">';
	jqTds[4].innerHTML = '<input type="text" value="'+aData[4]+'" title="'+ jqThs.eq(4).attr('abbr') +' row '+ rowIndex +'">';
	//jqTds[5].innerHTML = '<a class="edit" href="">Save</a>';
	//jqTds[5].innerHTML = '<button class="secondary_button rowActionBtn save">Save <span class="btnIconText sr-only actionRowNum">changes for ' + nRow + ' </span></button>';
	$(jqTds[5]).find(".rowActionBtn.edit").html('Save <span class="btnIconText sr-only actionRowNum">changes for ' + rowIndex + ' </span>').removeClass("edit").addClass("save");
	$(jqTds[0]).find("input").focus();
}

function saveRow ( oTable, nRow )
{
	var rowIndex = $(nRow).prop('rowIndex');
    var jqInputs = $('input', nRow);
    var selTr = $(nRow);
    selTr.removeClass("row_selected");
	oTable.fnUpdate( jqInputs[0].value, nRow, 0, false );
	oTable.fnUpdate( jqInputs[1].value, nRow, 1, false );
	oTable.fnUpdate( jqInputs[2].value, nRow, 2, false );
	oTable.fnUpdate( jqInputs[3].value, nRow, 3, false );
	oTable.fnUpdate( jqInputs[4].value, nRow, 4, false );
	//oTable.fnUpdate( '<a class="edit" href="">Edit</a>', nRow, 5, false );
	var editBtn = $(nRow).find(">td:eq(5) .rowActionBtn.save");
	editBtn.html('Edit <span class="btnIconText sr-only actionRowNum">row ' + rowIndex + ' </span>').removeClass("save").addClass("edit");
	oTable.fnDraw();
	editBtn.focus();
}

$(document).ready(function() {
   /* 
		Causing issues with dataTables.tableTools so it was commented out
   var oTable = $('.dataDatableAutoInit').dataTable({
        "bJQueryUI": true,
		"pagingType": "full_numbers",
        "dom": '<"H"Tlfr>t<ip>',
        "TableTools": {
            "aButtons": [
				
				{
					"sExtends": "xls",
					"sButtonText": "Export"
				}
			]
        }
    });*/
	
	
	var nEditing = null;
	
//	$('#new').click( function (e) {
//		e.preventDefault();
		
//		var aiNew = oTable.fnAddData( [ '', '', '', '', '', 
//			'<a class="edit" href="">Edit</a>', '<a class="delete" href="">Delete</a>' ] );
//		var nRow = oTable.fnGetNodes( aiNew[0] );
//		editRow( oTable, nRow );
//		nEditing = nRow;
//	} );
	
//	$('#example a.delete').live('click', function (e) {
//		e.preventDefault();
		
//		var nRow = $(this).parents('tr')[0];
//		oTable.fnDeleteRow( nRow );
//	} );
	
		
	window.handleTableEdit = function(nButton, nRow, oTable) {
		
		if ( nEditing !== null && nEditing != nRow ) {
			/* Currently editing - but not this row - restore the old before continuing to edit mode */
			restoreRow( oTable, nEditing );
			editRow( oTable, nRow );
			nEditing = nRow;
		}
		else if ( nEditing == nRow && $(nButton).hasClass("save")) {
			/* Editing this row and want to save it */
			saveRow( oTable, nEditing );
			nEditing = null;
		}
		else {
			/* No edit in progress - let's start one */
			editRow( oTable, nRow );
			nEditing = nRow;
		}
	}
});