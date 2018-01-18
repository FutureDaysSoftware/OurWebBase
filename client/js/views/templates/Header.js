/**
* Project: Future Days Farm Website
* Created By: Chris Baron
* Date Last Modified: 1/17/2018
* Description: This file builds the header elements on the Farm Website homepage
*/

module.exports = function( { model } ) 
{
	const navOptions = model.forEach(datum => `<span> ${ this.CapitalizeFirstLetter(datum) } </span>` )
	return `
	<nav>

		<!-- Links to other pages -->
		<div class = "links">

			<a href = "InsertURLToAboutUS"> ABOUT US </a>
			<a href = "InsertURLToWhereToFindUs"> WHERE TO FIND US </a>
			<a id = "futureDaysFarm" href = "InsertURLToFutureDaysFarm"> FUTURE DAYS FARM </a>
			<a href = "InserURLToTheBlog"> THE BLOG </a>
			<a href = "InsertURLToOurOfferings"> OUR OFFERINGS </a>

		</div>

	    <style>

	    	@import url('https://fonts.googleapis.com/css?family=Roboto');
	    	@import url('https://fonts.googleapis.com/css?family=Arvo');

	    	/**
	    	* The links to other pages
	    	*/
	    	.links
	    	{
	    		text-align: center;
	    		padding-top: 30px;
	    	}
	    	a
	    	{
	    		font-family: Roboto;
	    		color: #231F20;
	    		padding-right: 100px;
	    	}
	    	#futureDaysFarm
	    	{
	    		font-family: Arvo;
	    		color: #C49542;
	    		font-size: 17px;
	    		font-weight: bold;
	    	}

	    </style>

	</nav>
	`
}
