import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
interface CardProps {
  title: string;
  writer: string;
  link: string; // 링크를 위한 prop 추가
}

const CardComponent: React.FC<CardProps> = ({ title, writer,link }) => {
  return (
    <Link href={link} passHref>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ marginBottom: '10%'}}>
                {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
                執筆者：{writer}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardComponent;