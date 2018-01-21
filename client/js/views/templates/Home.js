/**
* Project: Future Days Farm Website
* Created By: Chris Baron
* Date Last Modified: 1/19/2018 by Alex Cadigan
* Description: This file builds the body of the page (the main content)
*/

module.exports = function( { model } ) 
{ 
	return `<div>

	<div id = "homeTitle">

		Welcome Headline

	</div>

	<div id = "homeSubtitle">

		ALLEGAN COUNTY, MICHIGAN

	</div>

	<br>

	<div id = "homeParagraph">

		Praesent laoreet ornare ligula, ac accumsan turpis sagittis at.
		Integer auctor egestas eleifend. Etiam luctus mattis justo, vitae
		fermentum libero euismod lacinia. Proin at consequat risus.
		Praesent sollicitudin vestibulum felis, ut sodales enim.

	</div>

	<br>

	<div id = "homePic1">

		<img src = /static/img/${"Jam.jpg"} alt = "Jam.jpg" height = "300" width = "300">

	</div>

	<div id = "homePic2">

		<img src = /static/img/${"Beets.jpg"} alt = "Beets.jpg">

	</div>

	<div id = "homePic3">

		<img src = /static/img/${"Squash.jpg"} alt = "Squash.jpg">

	</div>

	<br>

	<div id = "homePic4">



	</div>

	<div id = "homePic5">



	</div>

	<div id = "homePic6">



	</div>



	<style>

		@import url('https://fonts.googleapis.com/css?family=Roboto');
        @import url('https://fonts.googleapis.com/css?family=Arvo');

		#homeTitle
		{
			text-align: center;
			font-size: 32px;
			font-family: Arvo;
			color: #231F20;
			padding-top: 30px;
		}

		#homeSubtitle
		{
			text-align: center;
			font-family: Roboto;
			color: #231F20;
		}

		#homeParagraph
		{
			text-align: center;
			font-family: Roboto;
			color: #231F20;
			margin-right: 30%;
			margin-left: 30%;
		}

		#homePic1
		{
			display: inline-block;
			
		}
		#homePic2
		{
			display: inline-block;
			
		}
		#homePic3
		{
			display: inline-block;
			
		}

	</style>
	
	</div>` 
}
