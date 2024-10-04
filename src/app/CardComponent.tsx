import React from 'react';
import { Card, CardContent, Typography, CardMedia  } from '@mui/material';
import Link from 'next/link';
interface CardProps {
  title: string;
  content: string;
  imageSrc: string;
  link: string; // 링크를 위한 prop 추가
}

const CardComponent: React.FC<CardProps> = ({ title, content, imageSrc, link }) => {
  return (
    <Link href={link} passHref>
      <Card sx={{ width: 300, height: 200, margin: '16px' }}>
        <CardMedia
            component="img"
            height="150"
            image={imageSrc}
            alt={title}
        />
        <CardContent>
          <Typography variant="h5" component="div">
                {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
                {content}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardComponent;