module.exports = function( { model } ) {
const navOptions = model.forEach( datum => `<span>${this.CapitalizeFirstLetter(datum)}</span>` )
return `<nav>
    <div>
        <div>
            <span>Future</span>
            <span>Days</span>
        </div>
        <div>Software</div>
    </div>
    <div data-js="navList">${navOptions}</div>
</nav>
`
}
