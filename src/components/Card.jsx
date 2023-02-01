import React from "react"
import CardView from "./CardView.jsx";

export default function Card(props) {
    let badgeText
    if (props.openSpots === 0) {
        badgeText = "SOLD OUT"
    } else if (props.location === "Online") {
        badgeText = "ONLINE"
    }



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

    console.log(data)

    // console.log(props.name)
    return (
        <div className="card">
            <CardView isShow={isShow} handler={handlerIsShow} data={data}/>
            {badgeText && <div className="card--badge">{badgeText}</div>}
            <img src={`https://api.opentripmap.com/0.1/en/places/xid/W422141443?apikey=5ae2e3f221c38a28845f05b6f5a6dc7747c993a6f20028b8b8e69b9a`} className="card--image"  alt=""/>
            {/*<div className="card--body">*/}
            {/*    <div className="row">*/}
            {/*        <div className="card--stats">*/}
            {/*            <img src="https://cdn-icons-png.flaticon.com/24/1828/1828884.png" alt="" className="card--star"/>*/}
            {/*            <span>{props.stats.rating}</span>*/}
            {/*            <span className="gray">({props.stats.reviewCount})</span>*/}
            {/*            <span className="gray">{props.location}</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            <div className="card--body">
                <p>{props.properties.name}</p>
                <p>{props.type}</p>

                <button onClick={()=>{
                    memo()
                    handlerIsShow()
                }
                }>Get</button>
                <p><span className="bold">ID: {props.properties.xid}</span></p>
            </div>

            {/*</div>*/}

        </div>
    )
}