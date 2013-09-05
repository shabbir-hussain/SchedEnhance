function enhanceSched (){
	console.log("shced Enhance is working");
	var colors = new Array('#B10DFF','#FF0000','#FF8700','#FFD40D','#0292E8','#00FF3E');

	if(document.getElementsByTagName('iframe').length>0){
		//aim correct frame
	}
	else{
		var tab = document.getElementsByClassName('datadisplaytable');
		tab = tab[0];
		
		var rows = tab.getElementsByTagName('tr');
		var courses ={};

		//indentify all the cells that are classes
		for(var i=0;i<rows.length;i++){
			var cells = rows[i].getElementsByTagName('td');
			for(var j=0;j<cells.length;j++){
				if(cells[j].rowSpan > 1){
					var courseNumber = cells[j].innerText;
					var delim = courseNumber.indexOf('-');
					courseNumber  = courseNumber.substr(0,delim);
					
					//init empty array
					if(typeof(courses[courseNumber])=='undefined'){
						courses[courseNumber] = [];
					}
					
					courses[courseNumber].push(cells[j]);
				}
			}
		}

		//declare callback fcn
		function replaceCourseName () {
			var page = document.createElement( 'div' );
			page.innerHTML =this.responseText;
			var cap = page.getElementsByTagName('caption');
			var courseName =cap[0].innerText;
			var index = courseName.indexOf('.');
			var courseNumber = courseName.substr(index);
			courseName = courseName.substr(0,index);
			courseNumber = courseNumber.substr(4);
			courseNumber = courseNumber.substr(0,8);
			
			//console.log(courses[courseNumber]);
			var boxes = courses[courseNumber];
			for(var j=0;j<boxes.length;j++){
				var link = boxes[j].getElementsByTagName('a');
				
				link = link[0];
				var visual =link.innerText;
				//console.log(visual);
				var modifiedText = visual.substr(0,visual.indexOf('\n')+1)+courseName+'\n'+visual.substr(visual.indexOf('\n'));
				
				link.innerText=modifiedText;
				//console.log(modifiedText);
			}
			
			console.log(courseName+"    "+courseNumber);

		};
		
		//choose random color
		var i = Math.floor((Math.random()*colors.length));
		
		console.log(courses);
		for(var key in courses){
			var boxes = courses[key];
			var link = "";
			
			for(var j=0;j<boxes.length;j++){
				boxes[j].style.backgroundColor = colors[i];
				
				link = boxes[j].getElementsByTagName('a');
				link=link[0];
				link.href;
				link.style.color = '#000000';
			}
					
			
			
			var oReq = new XMLHttpRequest();
			oReq.onload = replaceCourseName;
			oReq.open("get", link.href, true);
			oReq.send();
				
			i++;
			i=i%colors.length;
		}
		
		

		

	}
}

$(document).ready(enhanceSched);
