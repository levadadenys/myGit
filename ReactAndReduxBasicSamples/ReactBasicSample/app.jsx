let ImageCounter = function (props) {
    return (
        <div className='image-counter'>
            <div className = 'count'>{props.count}</div>
            <img src={props.img_url} onClick = {props.onCount}/>
        </div>
    );
}


let Hero = React.createClass({
    getInitialState: function() {
        return {count : 0};
    },

    handleClick: function () {
        this.setState({count : ++this.state.count});
    },

    render: function() {
        return (
            <div className='container'>
                <ImageCounter count ={this.state.count} img_url = {this.props.img_url} onCount = {this.handleClick} />
                <h1>{this.props.title}</h1>
                <p>{this.props.subTitle}</p>
            </div>
        );
    }
});


let App = React.createClass ({
    render : function () {
        return (
        <div>
            {this.props.heroes.map((hero) => {
                return (<Hero title = {hero.title}
                                subTitle = {hero.subTitle}
                                img_url = {hero.img_url}
                                key = {hero.id}
                        />)
            })}
                        
    </div>)
    }
});

let data = [
    {
        id: 1,
        title: 'Hello React!',
        subTitle : 'Lib for creating awesome GUI',
        img_url : './img/react.png'
    },
    {
        id: 2,
        title : 'Angular2',
        img_url : './img/angular.png',
        subTitle : 'Maybe later'
    },
    {
        id: 3,
        title: 'Vue',
        subTitle: 'V',
        img_url: './img/vue.png'

    },
    {
        id: 4,
        title: 'Ember',
        subTitle: 'E',
        img_url: './img/ember.png'

    }
]

ReactDOM.render(<App heroes = {data} /> , document.getElementById('root'));