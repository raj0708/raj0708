$(document).ready(function() {
	
	//HEADER INCLUDE ON PAGE LOAD  
		$("#header").load("header.html"); 
	//FOOTER INCLUDE ON PAGE LOAD
		$("#footer").load("footer.html"); 
	 
	 //CALLING TIME INTERAVAL EVERY HALF A MINUTE
		timeleft();
		setInterval(timeleft, 500); 
	//CALLING GRAPH DATA FUNCTION EVERY ONE MINUTE
		getGraphData();
		setInterval(getGraphData, 60000);
	//CALLING TABLE DATA FUNCTION EVEREY FIVE MINUTES
		getTableData();
		setInterval(getTableData, 300000); 
});
// FOR TIME INITIATION AFTER AUTHENTICATION
 function timeleft(){
	$.ajax({
		type: "POST",
		url: "https://www.futures-services.com/job_posting/time.php",
		data:{username:"rajesh",password:"bura"},
		dataType:"json",
		Authorization: "Basic",
		success: function(data){
		 //READ JSON TIME SLOT
		 $(".countdown_time").text("");
		 //ASSIGN TIME SLOT 
		 $(".countdown_time").text(data);
		}
	});
}
// GET THE GRAPH DATA AND PLOTTING GRAPH USING PLOTLY 
function getGraphData(){
	$.ajax({
		type: "POST",
		url: "https://www.futures-services.com/job_posting/newfsphp5_60.php",
		data:{username:"rajesh",password:"bura"},
		dataType:"json",
		Authorization: "Basic",
		success: function(data){				 
			var regionalval = Array();
			var regionaltme = Array();			
				for(var i=0; i<data.length; i++)
				{
					var measured_value = parseFloat(data[i].measured_value);
					regionalval.push(measured_value);
					var time =(data[i].time);
					var parsedtme = mytime(time);
					regionaltme.push(parsedtme);
				}				
				var graph = {
					x: regionaltme,
					y: regionalval,
					type: 'scatter'
				};
				var data = [graph];
				var layout = {showlegend: false};
				Plotly.newPlot('graph_fs', data, layout); 
			}
		});
}
//READ TIME STAMP
function mytime(time)
{
	var date = new Date(time);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	return hours+":"+minutes+":"+seconds;
};
// GET THE TABLE DATA AND APPEND TO TABLE
 function getTableData(){
	$.ajax({
		type: "POST",
		url: "https://www.futures-services.com/job_posting/newfsphp3.php",
		data:{username:"rajesh",password:"bura"},
		DataType:"json",
		Authorization: "Basic",
		success: function(data){
		
			var appendTableData ="";
			//READ JSON DATA AND PULL INTO TABLE.
			 for(var j=0; j<data.length; j++)
			{
				var time = parseFloat(data[j].time);
				var nord = parseFloat(data[j].nord);
				var n_ost = parseFloat(data[j].n_ost);
				var ost = parseFloat(data[j].ost);
				var ost_2 = parseFloat(data[j].ost_2);
				var s_ost = parseFloat(data[j].s_ost);
				var mitte = parseFloat(data[j].mitte);
				var west = parseFloat(data[j].west);
				var r_main = parseFloat(data[j].r_main);
				var s_west =parseFloat(data[j].s_west);
				var sued = parseFloat(data[j].sued);
				appendTableData +="<tr><td>"+time+"</td><td>"+nord+"</td><td>"+n_ost+"</td><td>"+ost+"</td><td>"+ost_2+"</td><td>"+s_ost+"</td><td>"+mitte+"</td><td>"+west+"</td><td>"+r_main+"</td><td>"+s_west+"</td><td>"+sued+"</td></tr>";
				
			} 
			//APPEND TABLE DATA INTO TABLE
			$('#itemList').append(appendTableData);		
		}
	});
}