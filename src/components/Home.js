import React, { Component } from "react";
import Navbar from "./Navbar";
import "./css/Home.css";

class Home extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "Pederson Natural Farms 100% Grass Fed Organic Ground Beef 1 lb, 12-pack",
                "src": [ 
                    "https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&itemId=1463420-847&recipeName=470",
                ],
                "description": "100% Grass Fed Organic Ground Beef - Ground beef doesn't get any better than this! 100% Grass-Fed, Organic, and Non-GMO, this ground beef is about as natural as it comes. 85% Lean, 15% Fat. 16oz. A Pederson's Natural Farms Whole30 Approved product.",
                "price": 129.99,
                "count": 1
            }
        ]
    }

    render() {
        const {products} = this.state;
        
        return (
            <div className="home_container">
                <Navbar />
                {
                    products.map(item =>(
                        <div className="details">
                            <div className="big-img">
                                <img src={item.src[0]} alt=""/>
                            </div>

                            <div className="box">
                                <div className="row">
                                    <h2>{item.title}</h2>
                                    <span>${item.price}</span>
                                </div>
                                <p>{item.description}</p>

                                <div className="thumb">
                                    {
                                        item.src.map(img => (
                                            <img src={img} alt=""/>
                                        ))
                                    }
                                </div>
                                <button className="cart">Add to cart</button>

                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Home;