/**
* @version    1.2
* @copyright  Copyright (c) 2015	
* 
*/


function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function drawGraph(xc, yc, zc, xfields, yfields, zfields, top, side, front, xlabel, ylabel, zlabel) {	
   	top = typeof top !== 'undefined' ? top : '#BA1B1B';
   	side = typeof side !== 'undefined' ? side : '#BA1B1B';
   	front = typeof front !== 'undefined' ? front : '#BA1B1B';	
   	// xlabel = typeof xlabel !== 'undefined' ? xlabel : '#000000';
   	// ylabel = typeof ylabel !== 'undefined' ? ylabel : '#000000';
   	// zlabel = typeof zlabel !== 'undefined' ? zlabel : '#000000';	
   	topcolor = 'rgba('+hexToRgb(top).r+','+hexToRgb(top).g+','+hexToRgb(top).b+', 0.3)';
   	sidecolor = 'rgba('+hexToRgb(side).r+','+hexToRgb(side).g+','+hexToRgb(side).b+', 0.3)';
   	frontcolor = 'rgba('+hexToRgb(front).r+','+hexToRgb(front).g+','+hexToRgb(front).b+', 0.3)';

	if (!xc) {xc = 0}
	if (!yc) {yc = 0}
	if (!zc) {zc = 0}
	if (!xfields) {xfields = 0}
	if (!yfields) {yfields = 0}
	if (!zfields) {zfields = 0}
	if (!isNumber(xc) || !isNumber(yc) || !isNumber(zc)) {
		alert('Voer een getal in.');
	}
	else {	
		var c_canvas = document.getElementById("c");
		var context = c_canvas.getContext("2d");
		context.clearRect(0, 0, c_canvas.width, c_canvas.height);
		context.font = "bold 10px sans-serif";
		var xwidth = 1050;
		var ywidth = 800;
		var cellsize = 25;
		if ($('.grid').is(':checked')) {
			context.beginPath(); 
			/* GRID */
			// Numbering x
			// for (var y = 30.5; y < xwidth; y += cellsize*2) { 
			// 	context.fillText(y, y, 12);
			// }
			// // Numbering y
			// for (var x = 30.5; x < ywidth; x += cellsize*2) { 
			// 	context.fillText(x, 12, x);
			// } 
			// Draw horizontal lines
			for (var x = 30.5; x < xwidth; x += cellsize) {
				context.moveTo(x, 30);
				context.lineTo(x, ywidth);  
			}
			// Draw vertical lines
			for (var y = 30.5; y < ywidth; y += cellsize) {
				context.moveTo(30, y);
				context.lineTo(xwidth, y);
			}
			// draw
			context.strokeStyle = "#eee";
			context.stroke();
		};
		/* AXIS */
		context.beginPath(); 
		var zeropoint = 430.5;
		// x axis
		context.moveTo(zeropoint, zeropoint); 
		context.lineTo(880, zeropoint); 
		for (var x = zeropoint; x < 880; x += cellsize*2) {
			if (x != 0) {
				context.moveTo(x, zeropoint-2);
				context.lineTo(x, zeropoint+2);	
			};
		};
		// y axis
		context.moveTo(zeropoint, zeropoint);
		context.lineTo(zeropoint, 80.5); 
		for (var y = zeropoint; y > 80.5; y -= cellsize*2) {
			if (y != 0) {
				context.moveTo(zeropoint-2, y);
				context.lineTo(zeropoint+2, y);	
			};
		};
		// z axis
		context.moveTo(zeropoint, zeropoint); 
		context.lineTo(205.5, 655.5); 
		for (var z = cellsize; z < 225; z += cellsize) {
			if (z != 0) {
				context.moveTo(zeropoint-z+2, zeropoint+z);
				context.lineTo(zeropoint-z-2, zeropoint+z);	
			};
		};
		// draw
		context.strokeStyle = "#000";
		context.stroke();
		// start again
		context.beginPath();
		/* CUBE / PRISM coordinates */
		var hcells = yc;
		var wcells = xc;
		var dcells = zc;

		var height = (hcells * 100)/2;
		var width = (wcells * 100)/2;
		var depth = (dcells * 100)/4;

		var A = {}; 
		A.x = zeropoint+50 + width;
		A.y = zeropoint-50 - height;

		var B = {}; 
		B.x = zeropoint+50 + width;
		B.y = zeropoint;

		var C = {}; 
		C.x = zeropoint;
		C.y = zeropoint;

		var D = {}; 
		D.x = zeropoint;
		D.y = zeropoint-50 - height;

		var E = {}; 
		E.x = zeropoint-25 - depth;
		E.y = zeropoint-25 - height + depth; 

		var F = {}; 
		F.x = zeropoint+25 + width - depth;
		F.y = zeropoint-25 - height + depth;

		var G = {}; 
		G.x = zeropoint+25 + width - depth;
		G.y = zeropoint+25 + depth;

		var H = {}; 
		H.x = zeropoint-25 - depth;
		H.y = zeropoint+25 + depth;

		// A to B
		context.moveTo(A.x, A.y); 
		context.lineTo(B.x, B.y);
		// A to D
		context.moveTo(A.x, A.y); 
		context.lineTo(D.x, D.y); 
	 	// A to F
		context.moveTo(A.x, A.y); 
		context.lineTo(F.x, F.y);
		// F to G
		context.lineTo(G.x, G.y); 
		// G to H
		context.lineTo(H.x, H.y); 
		// H to E
		context.lineTo(E.x, E.y); 
		// E to D
		context.lineTo(D.x, D.y); 
		// E to F
		context.moveTo(E.x, E.y);
		context.lineTo(F.x, F.y);
		// G to B
		context.moveTo(G.x, G.y);
		context.lineTo(B.x, B.y);
		// draw
		context.strokeStyle = "#4F4F4F";
		context.stroke();
		// c2.closePath();
		/* AXIS LABELS */
		context.fillStyle = '#000';
		context.font = "bold 12px sans-serif";
		context.fillText("Technologieën (x)", 890, 432.5);
		context.fillText("Behoeften (y)", 402.5, 75.5);
		context.fillText("Afnemers (z)", 180.5, 670.5);

		// front face
	 	context.fillStyle = frontcolor;
	 	context.beginPath();
		context.moveTo(E.x, E.y);
		context.lineTo(F.x, F.y);
		context.lineTo(G.x, G.y);
		context.lineTo(H.x, H.y);
		context.closePath();
		context.fill();
		// side face
	 	context.fillStyle = sidecolor;
	 	context.beginPath();
		context.moveTo(F.x, F.y);
		context.lineTo(A.x, A.y);
		context.lineTo(B.x, B.y);
		context.lineTo(G.x, G.y);
		context.closePath();
		context.fill();
		// top face
	 	context.fillStyle = topcolor;
	 	context.beginPath();
		context.moveTo(D.x, D.y);
		context.lineTo(A.x, A.y);
		context.lineTo(F.x, F.y);
		context.lineTo(E.x, E.y);
		context.closePath();
		context.fill();

		/* LABELS */
		// x axis
		context.beginPath();
		var v = 0;
		for (var x = zeropoint; x < 880; x += cellsize*2) {
			if (x != 0) {
				v++;
				if (v <= xfields) {
					context.font = "bold 11px sans-serif";
					context.fillStyle = xlabel;
					context.fillText($(".x"+v).val(), x+12.5, zeropoint+10+(v*cellsize/2));					
				};
			};
		};
		context.strokeStyle = "#000";
		context.stroke();
		context.beginPath();
		// y axis
		var v = 0;
		for (var y = zeropoint; y > 80.5; y -= cellsize*2) {
			if (y != 0) {
				v++;
				if (v <= yfields) {	
					context.font = "bold 11px sans-serif";
					context.fillStyle = ylabel;		
					context.fillText($(".y"+v).val(), zeropoint+15+(v*cellsize/2), y-25);
				};		
			};
		};
		context.strokeStyle = "#000";
		context.stroke();
		context.beginPath();
		// z axis
		var v = 0; 
		for (var z = cellsize; z < 225; z += cellsize) {
			if (z != 0) {
				v++;
				if (v <= zfields) { 
					context.fillStyle = zlabel;
					context.fillText($(".z"+v).val(), zeropoint-z-(v*12)-50, zeropoint+z-10);
				};
			};
		};

		// ABCD EFGH LABELZ, dont delete pl0x
		// context.fillStyle = 'rgba(0,0,0,1)';
		// context.fillText("A", A.x + 2, A.y + 2);
		// context.fillText("B",B.x + 2, B.y - 2);
		// context.fillText("C",C.x + 2, C.y - 2);
		// context.fillText("D",D.x + 2, D.y - 2);
		// context.fillText("E",E.x - 10, E.y - 2);
		// context.fillText("F",F.x - 10, F.y - 2);
		// context.fillText("G", G.x + 5, G.y + 12);
		// context.fillText("H",H.x, H.y + 12);

	}
}

$("button.makeimage").click(function() {
	$("p.asdf").html('<span style="color:red;font-weight:bold;">In het nieuwe venster kun je het plaatje opslaan.</span>');
    var can = document.getElementById("c");
    var win=window.open();
	win.document.write("<img src='"+can.toDataURL()+"'/>");
});

$("button.labelz").click(function() {
	getFields();
});

function getFields() {
	xfields = $("#xfields").val();
	yfields = $("#yfields").val();
	zfields = $("#zfields").val();
	if (xfields < 0 || xfields == '') {xfields = 0;$("#xfields").val(0)};
	if (yfields < 0 || yfields == '') {yfields = 0;$("#yfields").val(0)};
	if (zfields < 0 || zfields == '') {zfields = 0;$("#zfields").val(0)};
	if (xfields > 9 ) {xfields = 9;$("#xfields").val(9)};
	if (yfields > 9 ) {yfields = 9;$("#yfields").val(9)};
	if (zfields > 9 ) {zfields = 9;$("#zfields").val(9)};
	$(".xlabel").html('');
	for (var ind = 0; ind < xfields; ind++) {
		$(".xlabel").append('<label for="x'+(ind+1)+'">x'+(ind+1)+'</label><input type="text" class="x'+(ind+1)+'" id="x'+(ind+1)+'" value="x'+(ind+1)+'" /><br/>');
	}
	$(".ylabel").html('');
	for (var ind = 0; ind < yfields; ind++) {
		$(".ylabel").append('<label for="y'+(ind+1)+'">y'+(ind+1)+'</label><input type="text" class="y'+(ind+1)+'" id="y'+(ind+1)+'" value="y'+(ind+1)+'" /><br/>');
	}
	$(".zlabel").html('');
	for (var ind = 0; ind < zfields; ind++) {
		$(".zlabel").append('<label for="z'+(ind+1)+'">z'+(ind+1)+'</label><input type="text" class="z'+(ind+1)+'" id="z'+(ind+1)+'" value="z'+(ind+1)+'" /><br/>');
	}
}

$("button.button").click(function() {
	var inx;
	var iny;
	var inz;
	var xfields;
	var yfields;
	var zfields;
	var ctop = $("#top").val();
	var cside = $("#side").val();
	var cfront = $("#front").val();
	var xlabel = $("#xlabel").val();
	var ylabel = $("#ylabel").val();
	var zlabel = $("#zlabel").val();
	if (inx < 0 || inx =='') {inx = 0;$(".inx").val(0)};
	if (iny < 0 || iny =='') {iny = 0;$(".iny").val(0)};
	if (inz < 0 || inz =='') {inz = 0;$(".inz").val(0)};
	inx = $(".inx").val() - 1;
	iny = $(".iny").val() - 1;
	inz = $(".inz").val() - 1;
	if (inx < 0 || inx =='') {inx = 0};
	if (iny < 0 || iny =='') {iny = 0};
	if (inz < 0 || inz =='') {inz = 0};
    var FieldShellelements = $(".xlabel");
    for (i = 0; i < FieldShellelements.length; i++) {
        xfields = $(FieldShellelements[i]).children('input').length;
    }
    var FieldShellelements = $(".ylabel");
    for (i = 0; i < FieldShellelements.length; i++) {
        yfields = $(FieldShellelements[i]).children('input').length;
    }
    var FieldShellelements = $(".zlabel");
    for (i = 0; i < FieldShellelements.length; i++) {
        zfields = $(FieldShellelements[i]).children('input').length;
    }
	if (ctop < 0 || ctop == '') {ctop = "#ffffff";$("#top").val("#ffffff")};
	if (cside < 0 || cside == '') {cside = "#ffffff";$("#side").val("#ffffff")};
	if (cfront < 0 || cfront == '') {cfront = "#ffffff";$("#front").val("#ffffff")};
	if (xlabel < 0 || xlabel == '') {xlabel = "#000000";$("#xlabel").val("#000000")};
	if (ylabel < 0 || ylabel == '') {ylabel = "#000000";$("#ylabel").val("#000000")};
	if (zlabel < 0 || zlabel == '') {zlabel = "#000000";$("#zlabel").val("#000000")};

	if (inx > 9 ) {inx = 9;$(".inx").val(9)};
	if (iny > 9 ) {iny = 9;$(".iny").val(9)};
	if (inz > 9 ) {inz = 9;$(".inz").val(9)};
	if (xfields < 0 || xfields == '') {xfields = 0;$("#xfields").val(0)};
	if (yfields < 0 || yfields == '') {yfields = 0;$("#yfields").val(0)};
	if (zfields < 0 || zfields == '') {zfields = 0;$("#zfields").val(0)};
	if (xfields > 9 ) {xfields = 9;$("#xfields").val(9)};
	if (yfields > 9 ) {yfields = 9;$("#yfields").val(9)};
	if (zfields > 9 ) {zfields = 9;$("#zfields").val(9)};
	drawGraph(inx, iny, inz, xfields, yfields, zfields, ctop, cside, cfront, xlabel, ylabel, zlabel)
});

$(document).ready(function() {
	var inx;
	var iny;
	var inz;
	var xfields;
	var yfields;
	var zfields;
	var ctop = $("#top").val();
	var cside = $("#side").val();
	var cfront = $("#front").val();
	var xlabel = $("#xlabel").val();
	var ylabel = $("#ylabel").val();
	var zlabel = $("#zlabel").val();
	if (inx < 0) {inx = 0;$(".inx").val(0)};
	if (iny < 0) {iny = 0;$(".iny").val(0)};
	if (inz < 0) {inz = 0;$(".inz").val(0)};
	inx = $(".inx").val() - 1;
	iny = $(".iny").val() - 1;
	inz = $(".inz").val() - 1;
	// xfields = $("#xfields").val();
	// yfields = $("#yfields").val();
	// zfields = $("#zfields").val();
    var FieldShellelements = $(".xlabel");
    for (i = 0; i < FieldShellelements.length; i++) {
        xfields = $(FieldShellelements[i]).children('input').length;
    }
    var FieldShellelements = $(".ylabel");
    for (i = 0; i < FieldShellelements.length; i++) {
        yfields = $(FieldShellelements[i]).children('input').length;
    }
    var FieldShellelements = $(".zlabel");
    for (i = 0; i < FieldShellelements.length; i++) {
        zfields = $(FieldShellelements[i]).children('input').length;
    }
	if (ctop < 0 || ctop == '') {ctop = "#ffffff";$("#top").val("#ffffff")};
	if (cside < 0 || cside == '') {cside = "#ffffff";$("#side").val("#ffffff")};
	if (cfront < 0 || cfront == '') {cfront = "#ffffff";$("#front").val("#ffffff")};
	if (xlabel < 0 || xlabel == '') {xlabel = "#000000";$("#xlabel").val("#000000")};
	if (ylabel < 0 || ylabel == '') {ylabel = "#000000";$("#ylabel").val("#000000")};
	if (zlabel < 0 || zlabel == '') {zlabel = "#000000";$("#zlabel").val("#000000")};

	if (inx > 9) {inx = 9;$(".inx").val(9)};
	if (iny > 9) {iny = 9;$(".iny").val(9)};
	if (inz > 9) {inz = 9;$(".inz").val(9)};
	if (xfields < 0) {xfields = 0;$("#xfields").val(0)};
	if (yfields < 0) {yfields = 0;$("#yfields").val(0)};
	if (zfields < 0) {zfields = 0;$("#zfields").val(0)};
	if (xfields > 9 ) {xfields = 9;$("#xfields").val(9)};
	if (yfields > 9 ) {yfields = 9;$("#yfields").val(9)};
	if (zfields > 9 ) {zfields = 9;$("#zfields").val(9)};
	drawGraph(inx, iny, inz, xfields, yfields, zfields, ctop, cside, cfront, xlabel, ylabel, zlabel)
});
