import React from 'react';

function Column({header,arr}) {

    return (
        <div style={{maxWidth:100,display:'flex',flexDirection:'column',border:'1px solid black'}}>
            <p style = {{fontWeight:'700',paddingLeft:'5px',paddingRight:'5px',marginLeft:'auto',scrollMarginLeft:'auto'}}>{header}</p>
            {arr.map((row, index) => (
                <div style={{maxWidth:100,height:50,paddingLeft:5,paddingRight:5,borderTop:'1px solid black'}}>
                    <p>{row[header]}</p>
                </div>
            ))}
        </div>
    )
}

export default Column;