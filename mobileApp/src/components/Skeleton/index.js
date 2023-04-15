import React from 'react';

const Skeleton = (height, width) => {
    let items = [1,2,3];
    return (
        <>
            {items.map((item, index) => {
                <Skeleton key={index} height={height} width={width} />;
            })}
        </>
    );
};

export default Skeleton;
