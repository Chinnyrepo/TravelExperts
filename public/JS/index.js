let caption=["Honeymoon", "River-Cruise", "Wedding", "Family-Vacation"];
    let images=["https://images.pexels.com/photos/2549008/pexels-photo-2549008.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=500", 
      "https://images.pexels.com/photos/1117773/pexels-photo-1117773.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=500", 
      "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=220&w=500", 
      "https://images.pexels.com/photos/3155726/pexels-photo-3155726.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=500"];
    document.getElementById("Honeymoon").innerHTML=(caption[0]);
    document.getElementById("River-Cruise").innerHTML=(caption[1]);
    document.getElementById("Wedding").innerHTML=(caption[2]);
    document.getElementById("Family-Vacation").innerHTML=(caption[3]);
    function vacation(x){
      let theElement=x.id;
      let ind=caption.indexOf(theElement);
      x.innerHTML=("<img src=" +images[ind]+ "></img>");
      console.log(x.innerHTML)
    }  

    let ArrayOfImages = ["https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=100&w=500",
                         "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=500",
                       "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=500",
                       "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=500"]; 
      url = ["https://www.velaaprivateisland.com/", "https://www3.hilton.com/en/hotels/seychelles/hilton-seychelles-northolme-resort-and-spa-SEZHIHI/index.html", 
             "https://www.radissonhotels.com/en-us/hotels/radisson-blu-resort-fiji-denarau-island", 
             "https://bluepalawan.com/"];
    for (let i=0; i<4; i++){
    let myimg = document.createElement("img");
    myimg.setAttribute("src", ArrayOfImages[i]);
    myimg.setAttribute("width", "330");
    myimg.setAttribute("onclick","openWindow("+ i +")");
    console.log(myimg);
    document.body.appendChild(myimg);
}

function openWindow(x){
           let newwindow = window.open(url[x], "_blank");
           setTimeout(function(){
           newwindow.close();
           },5000);
  }
    
