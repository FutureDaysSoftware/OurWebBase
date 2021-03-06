module.exports = Object.create( Object.assign( {}, require('../../lib/MyObject'), {
    
    ViewFactory: require('./factory/View'),
    
    Views: require('./.ViewMap'),

    Singletons: [ 'Header' ],

    initialize() {

        this.contentContainer = document.querySelector('#content')

        this.ViewFactory.constructor();

        this.Singletons.forEach( name => this.Views[name].constructor( { factory: this.ViewFactory } ) )

        window.onpopstate = this.handle.bind(this)

        this.Views.Header.on( 'navigate', route => this.navigate( route ) )

        this.footer = this.ViewFactory.create( 'footer', { insertion: { el: document.body } } )

        this.handle()
    },

    handle() {
        this.handler( window.location.pathname.split('/').slice(1) )
    },

    handler( path ) {
        const name = this.pathToView( path[0] ),
            view = this.Views[ name ] ? name : 'home'

        if( view === this.currentView ) return this.views[ view ].onNavigation( path.slice(1) )

        this.scrollToTop()

        Promise.all( Object.keys( this.views ).map( view => this.views[ view ].hide() ) )
        .then( () => {

            this.currentView = view

            if( this.views[ view ] ) return this.views[ view ].onNavigation( path )

            return Promise.resolve(
                this.views[ view ] =
                    this.ViewFactory.create( view, { insertion: { el: this.contentContainer }, path } )
                    .on( 'navigate', ( route, options ) => this.navigate( route, options ) )
                    .on( 'deleted', () => delete this.views[ view ] )
            )
        } )
        .catch( this.Error )
       
        this.footer.els.container.classList.toggle( 'hidden', view === 'Admin' )
    },

    navigate( location, options={} ) {
        if( options.replace || options.up ) {
            let path = `${window.location.pathname}`.split('/')
            path.pop()
            if( options.replace ) path.push( location )
            location = path.join('/')
        }
        else if( options.append ) { location = `${window.location.pathname}/${location}` }

        if( location !== window.location.pathname ) history.pushState( {}, '', location )
        if( !options.silent ) this.handle()
    },

    onLogout() {
        Promise.all( Object.keys( this.views ).map( view => this.views[ view ].delete() ) )
        .then( () => { this.currentView = undefined; return this.handle() } )
        .catch( this.Error )
    },

    pathToView( path ) {
        const hyphenSplit = path.split('-')
        return hyphenSplit.map( item => this.capitalizeFirstLetter( item ) ).join('')
    },

    scrollToTop() {
        window.scroll( { top: 0, left: 0, behavior: 'smooth' } )
    }

} ), { currentView: { value: '', writable: true }, views: { value: { } } } )
