import React, { useState } from 'react';

import Editor from '@monaco-editor/react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { height, styled } from '@mui/system';
import Iconify from './Iconify';

const CodeEditorWindow = ({ onChange, language, code, theme, sx, other }) => {
  const [value, setValue] = useState(code || '');

  const handleEditorChange = (value) => {
    setValue(value);
    onChange('code', value);
  };

  const ButtonFileStyle = styled('div')(({ theme }) => ({
    backgroundColor: '#1e1e1e',
    height: '100%',
    width: 120,
    color: '#e0e0e0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }));

  return (
    <Box sx={{ ...sx }} {...other}>
      <Box sx={{ bgcolor: '#343434', height: 48 }}>
        <ButtonFileStyle>
          <Iconify icon={'logos:javascript'} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            main.js
          </Typography>
        </ButtonFileStyle>
      </Box>
      <Editor
        height="40vh"
        width={`100%`}
        language={language || 'javascript'}
        value={value}
        theme={'vs-dark'}
        defaultValue="// some comment"
        onChange={handleEditorChange}
        options={{ minimap: { enabled: false } }}
      />
    </Box>
  );
};
export default CodeEditorWindow;
