import React from "react"
import CardView from "./CardView.jsx";




export default function Card(props) {

    const [data, setData] = React.useState([])
    const [isShow, setIsShow] = React.useState(false)

    const handlerIsShow = ()=>{
        setIsShow(!isShow)
    }

    const memo = React.useCallback(async () => {
        fetch(`https://api.opentripmap.com/0.1/en/places/xid/${props.properties.xid}?apikey=5ae2e3f221c38a28845f05b6f5a6dc7747c993a6f20028b8b8e69b9a`)
            .then(res => res.json())
            .then((data) => setData(data));
    }, [props.properties.xid])

    function separateString() {
        const categories = props.properties.kinds.split(',')
        return categories.map((item) => <h3 className="category">{item}</h3>)
    }

    return (
        <div className="card">
                <CardView isShow={isShow} handler={handlerIsShow} data={data}/>
                <div className="card--body">
                    <h3 className="card--title">{props.properties.name}</h3>

                    <div className="card-button-container">
                        <button className="card--button" onClick={()=>{
                            memo()
                            handlerIsShow()
                        }
                        }>Read more</button>
                        {props.properties?.osm !== undefined ? <a href={`https://www.openstreetmap.org/${props.properties?.osm}`}><img src="https://cdn-icons-png.flaticon.com/32/592/592245.png" alt=""/></a> : null}
                    </div>

                    <div className="categories-container">
                        {separateString()}
                    </div>
                    {/*<p><span className="bold">ID: {props.properties.xid}</span></p>*/}
                </div>
        </div>
    )
}