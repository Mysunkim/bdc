import { useState } from 'react';
import { Button, Box } from '@mui/material';

const UploadForm = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const upLoadhandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('File uploaded successfully!');
            } else {
                console.error('File upload failed.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <Box component="form" onSubmit={upLoadhandleSubmit} sx={{ mt: 2 }}>
          <input type="file" onChange={handleFileChange} />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }}>
                アップロード
            </Button>
        </Box>
    );
};

export default UploadForm;