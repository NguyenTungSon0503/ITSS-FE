import React from 'react';

const Logo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ height: '30px', width: '5px', background: "linear-gradient(to right, #8F21AF, #A82BA1)", borderRadius: 50, marginRight: '5px' }}></div>
      <div style={{ height: '20px', width: '5px', background: "linear-gradient(to right, #ED4974, #F84E6D)", borderRadius: 50, marginRight: '1px' }}></div>
      <div style={{ margin: '0 10px', fontSize: '24px', marginRight: '1px', marginLeft: '1px', background: "linear-gradient(to bottom, #8F21AF, #A82BA1, #ED4974, #F84E6D, #EE4A74, #F74D6D, #FC9435, #FDA12A)", WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4</div>
      <div style={{ height: '20px', width: '5px', background: "linear-gradient(to right, #EE4A74, #F74D6D)", borderRadius: 50, marginRight: '5px' }}></div>
      <div style={{ height: '30px', width: '5px', background: "linear-gradient(to right, #FC9435, #FDA12A)", borderRadius: 50, marginRight: '5px' }}></div>
    </div>
  );
};

export default Logo;
