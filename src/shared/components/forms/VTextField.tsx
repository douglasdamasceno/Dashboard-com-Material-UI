import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import React, { useEffect, useState } from 'react';

type TVTextFieldProps = TextFieldProps & {
   name:string; 
}

export const VTextField: React.FC<TVTextFieldProps> = ({name,...rest}) => {
    const {fieldName, registerField,defaultValue,error,clearError} = useField(name);

    const [value,setValue] = useState(defaultValue || '');

    useEffect(()=>{
        registerField({
            name:fieldName,
            setValue:(_,newValue)=> setValue(newValue),
            getValue:()=>value,
        });
    },[registerField,fieldName,value]);

    return (
      <TextField 
        {...rest}
        error={!!error}
        helperText={error}
        defaultValue={defaultValue}
        
        name={name}

        onKeyDown={()=> error ? clearError():undefined}

        value={value}
        onChange={(e)=>setValue(e.target.value)}

      />
  );
}
