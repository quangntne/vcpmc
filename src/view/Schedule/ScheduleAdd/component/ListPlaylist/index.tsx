import React from "react";
import ItemPlayList from "@view/Schedule/ScheduleAdd/component/ItemPlayList";

const arrPlaylist = [
    {
        name: "Top USUK",
        time: "02:00:00",
        id: 1
    },
    {
        name: "Love Songs",
        time: "01:00:00",
        id: 2
    },
    {
        name: "Loving You",
        time: "02:15:03",
        id: 3
    },
    {
        name: "Summer Party",
        time: "02:10:11",
        id: 4
    },
];


const ListPlaylist = props => {
    return(
        <>
            <section className="list-playlist">
                <div className="wrap-list-playlist">

                    <h5>Danh sách Playlist</h5>
                    {
                        arrPlaylist.length > 0 && arrPlaylist.map((item, index)=>{
                            return <ItemPlayList time={item.time} name={item.name} index={index} id={item.id}/>
                        })
                    }
                    <hr className="hr-playlist"/>
                    <h5>Playlist mới</h5>
                    {
                        arrPlaylist.length > 0 && arrPlaylist.map((item, index)=>{
                            return <ItemPlayList time={item.time} name={item.name} index={index}/>
                        })
                    }
                    <hr className="hr-playlist"/>
                    <h5>Playlist đề xuất</h5>

                    {
                        arrPlaylist.length > 0 && arrPlaylist.map((item, index)=>{
                            return <ItemPlayList time={item.time} name={item.name} index={index}/>
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default ListPlaylist