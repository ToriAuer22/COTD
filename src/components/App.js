import React from "react"; 
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {}, 
        order: {}
    };
    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    } 
    
    componentDidUpdate() {
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

   

    addFish = fish => {
        //take copy of existing state
        const fishes = {...this.state.fishes };
        //add new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //set the new fishes object to state
        this.setState ({
            fishes: fishes
        });
    }

    updateFish = (key, updateFish) => {
        const fishes = {...this.state.fishes};
        fishes[key] = updateFish;
        this.setState({fishes});
    }

    deleteFish = (key) => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    };

loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
};

addToOrder = key => {
    //Take copy of state
    const order = {...this.state.order};
    //add to or update order
    order[key] = order[key] + 1 || 1;
    //call setState to update state object
    this.setState({ order });
}

removeFromOrder = key => {
    //Take copy of state
    const order = {...this.state.order};
    //add to or update order
    delete order[key];
    //call setState to update state object
    this.setState({ order });
}

    render() {
        return (
            <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market" age={100}/>
                <ul className="fishes">
                   {Object.keys(this.state.fishes).map(key => (
                   <Fish 
                    key = {key} 
                    index={key}
                    details={this.state.fishes[key]} 
                    addToOrder={this.addToOrder}/>
                   ))}
                </ul>
            </div>
            <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
            <Inventory 
            addFish={this.addFish}
            updateFish={this.updateFish}
            deleteFish={this.deleteFish}
            loadSampleFishes={this.loadSampleFishes}
            fishes = {this.state.fishes}
            />
            </div>
        );
    }
}

export default App;