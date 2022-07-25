import { Box, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import CodeEditorWindow from 'src/components/CodeEditer';
import { compile } from 'src/fetching/compiler.api';

const LessonCoding = () => {
  const javascript = ` const n = 1000000;
  let total = 0
  for(let i = 0; i < n; i++) {
    total += i
  }
  console.log(total)`;

  const [code, setCode] = useState(javascript);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleOnChange = (action, data) => {
    switch (action) {
      case 'code': {
        setCode(data);
        break;
      }
      default: {
        console.warn('case not handled!', action, data);
      }
    }
  };

  // const checkStatus = async (token) => {
  //   const options = {
  //     method: 'GET',
  //     url: `http://54.179.77.193/submissions/${token}`,
  //     params: { base64_encoded: 'true', fields: '*' },
  //   };
  //   try {
  //     let response = await axios.request(options);
  //     let statusId = response.data.status?.id;

  //     // Processed - we have a result
  //     if (statusId === 1 || statusId === 2) {
  //       // still processing
  //       setTimeout(() => {
  //         checkStatus(token);
  //       }, 2000);
  //       return;
  //     } else {
  //       setOutput(response.data.stdout);
  //       console.log('response.data', response.data);
  //       return;
  //     }
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // };
  console.log(output);

  const handleCompile = async () => {
    const formData = {
      language_id: 63,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(''),
    };

    const res = await compile(formData);

    console.log(res);
    setOutput(res?.stdout);
    // const options = {
    //   method: 'POST',
    //   url: 'http://54.179.77.193/submissions',
    //   params: { base64_encoded: 'true', fields: '*' },
    //   headers: {
    //     'content-type': 'application/json',
    //     'Content-Type': 'application/json',
    //     // 'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
    //     // 'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    //   },
    //   data: formData,
    // };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log('res.data', response.data);
    //     const token = response.data.token;
    //     checkStatus(token);
    //   })
    //   .catch((err) => {
    //     let error = err.response ? err.response.data : err;
    //     // get error status
    //     let status = err.response.status;
    //     console.log('status', status);
    //     if (status === 429) {
    //       console.log('too many requests', status);

    //       showErrorToast(
    //         `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
    //         10000
    //       );
    //     }
    //     console.log('catch block...', error);
    //   });
  };

  return (
    <div>
      <CodeEditorWindow onChange={handleOnChange} code={code} />
      <Stack direction={'row'} justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleCompile}>
          Run
        </Button>
      </Stack>
      <Box
        sx={{
          height: 160,
          mt: 2,
          bgcolor: (theme) => theme.palette.background.paper,
        }}
      >
        {/* <pre>{atob(output)}</pre> */}
        <Typography variant="body1">{atob(output)}</Typography>
      </Box>
    </div>
  );
};

export default LessonCoding;
