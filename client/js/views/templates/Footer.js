/**
* Project: Future Days Farm Website
* Created By: Chris Baron
* Date Last Modified: 1/19/2018 by Alex Cadigan
* Description: This file builds the footer elements on the Farm Website homepage
*/

module.exports = function() 
{ 
    return `<footer id = "footerBody">

    <!-- Future Days Farm Info -->
    <div id = "footerTitle" class = "footer">

        FUTURE DAYS FARM

    </div>

    <div class = "footer">

        2123 Tiny Road
        <br>
        Town Name, Michigan 33344        

    </div>

    <br>

    <div class = "footer">

        <a id = "footerLink" href = "mailto:Info@FutureDaysFarm.com"> Info@FutureDaysFarm.com </a>
        <br>
        (333) 323-8899

    </div>

    <br>

    <!-- Copyright -->
    <div id = "footerBottom" class = "footer">

        Copyright ${ new Date().getFullYear() } FutureDays Software

    </div>

    <style>

        @import url('https://fonts.googleapis.com/css?family=Roboto');
        @import url('https://fonts.googleapis.com/css?family=Arvo');

        /**
        * Body of footer
        */
        #footerBody
        {
            background-color: #C49542;
        }

        /**
        * Future Days Farm Info
        */
        .footer
        {
            text-align: center;
            font-family: Roboto;
            color: #231F20;
        }
        #footerTitle
        {
            padding-top: 40px;
            font-family: Arvo;
            color: white;
            font-weight: bold;
        }
        #footerLink
        {
            color: #231F20;
            text-decoration: none;
        }
        #footerBottom
        {
            padding-bottom: 40px;
        }

    </style>

    </footer>`
}
