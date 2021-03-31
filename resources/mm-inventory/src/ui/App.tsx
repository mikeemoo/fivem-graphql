import React, { useState, useEffect, useCallback } from 'react';
import callClient from './callClient';
import Radium from 'radium';
import { motion } from 'framer-motion';
import { Container } from 'types/graphql';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const fetchInventory = useCallback(async () => {
    const inventory = await callClient<Container>('getInventory');
    setItems(inventory.items);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  if (isLoaded) {
    return (
      <>
        <div style={styles.inventory} />
        {items.map(item => (
          <motion.div
            key={item.id}
            drag
            style={styles.item}
            dragMomentum={false}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 1.1 }}
          />
        ))}
      </>
    );
  }
  return <div />;
};

const styles: Radium.StyleRules = {
  inventory: {
    position: 'fixed',
    left: '50%',
    bottom: 0,
    transform: 'translate(-50%, 0%)',
    margin: '0 auto',
    backgroundColor: 'white',
    opacity: 0.3,
    width: 491,
    height: 48,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  item: {
    position: 'absolute',
    background: 'white',
    width: 48,
    height: 48,
    borderRadius: 5,
  },
};

export default Radium(App);
