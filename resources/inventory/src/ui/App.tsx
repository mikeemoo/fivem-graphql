import React, { useState, useEffect } from "react";
import Radium from "radium";
import { motion } from "framer-motion"

const App = () => {
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    fetch(`https://inventory/getInventory`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({})
    })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      setItems(resp.items);
      setIsLoaded(true);
    });
  }, []);


  if (isLoaded) {
    return (
      <>
        <div style={styles.inventory} />
        {items.map((item) => 
          <motion.div
            key={item.id}
            drag
            style={styles.item}
            dragMomentum={false}
            whileHover={{ scale: 1.04  }}
            whileTap={{ scale: 1.1 }}
           />
         )}
      </>
    )
  }
  return <div />

}

const styles: {
  [Key: string]: React.CSSProperties;
} = {
  inventory: {
    position: "fixed",
    left: "50%",
    bottom: 0,
    transform: "translate(-50%, 0%)",
    margin: "0 auto",
    backgroundColor: "white",
    opacity: 0.1,
    width: 491,
    height: 48,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  item: {
    position: "absolute",
    background: "white",
    width: 48,
    height: 48,
    borderRadius: 5
  }
}


export default Radium(App);