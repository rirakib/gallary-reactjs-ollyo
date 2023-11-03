import { useEffect, useRef, useState } from "react";
import imageData from "./data/images"

const Gallery = () => {

    const [images, setImages] = useState(imageData)
    const[selectedImage, setSelectedImage] = useState([])

    const dragImage = useRef(0)
    const draggedOverImage = useRef(0)

    const handleSorting = () => {

        const imageClone = [...images]
        let temp = imageClone[dragImage.current]
        imageClone[dragImage.current] = imageClone[draggedOverImage.current]
        imageClone[draggedOverImage.current] = temp
        setImages(imageClone)

    }
    
    const handleMultiSelectedImage = (id) => {
      
        if(selectedImage.includes(id)){
            let filtered = selectedImage.filter((item)=> item != id)
            setSelectedImage(filtered)
        }else{
           setSelectedImage([...selectedImage,id])
        }

        
    }

    const imagesDeleteHandle = () => {
       
        if(selectedImage.length > 0){
            setImages(images.filter((item) => !selectedImage.includes(item.id) ))
            setSelectedImage([])
        }

    }
    
    useEffect(()=> {
        
        if(selectedImage.length >= 1){
        
            document.getElementById('gallery').innerHTML = `<input type="checkbox" checked /> ${selectedImage.length} file selected`
        }else{
            document.getElementById('gallery').innerHTML = `Gallery`
        }

    },[selectedImage , images])
    

    
 
    

    return (
        <>

            <div className="grid-container">
                <div className="header">
                    <div className="left_side">
                        <span id="gallery">Gallery</span>
                    </div>
                    <div className="right_side">
                        <button className="delete" onClick={()=> imagesDeleteHandle()}>Delete File</button>
                    </div>
                </div>

                <div className="my-grid">
                    {
                        images.map((item,ind) => {
                            return (
                                <div className="single-grid"
                                draggable
                                onDragStart={()=> (dragImage.current = ind)}
                                onDragEnter={()=> (draggedOverImage.current = ind)}
                                onDragEnd={handleSorting}
                                onDragOver={(e) => e.preventDefault()}
                                key={ind}
                                >   
                                    <input type="checkbox"
                                        className={`checkbox ${selectedImage.includes(item.id) ? 'active' : ''}`}
                                        checked={selectedImage.includes(item.id)}
                                        onChange={() => handleMultiSelectedImage(item.id)}
                                    />
                                    <img src={item.src} alt={`Image ${item.id}`} />
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Gallery