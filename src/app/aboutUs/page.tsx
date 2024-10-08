"use client"; 
import { useEffect, useState } from 'react';
const Home = () => {


    return (
        <div>
            <div className = "mainbox">  
                <div>
                    <h1>私たちは</h1>   
                    <p className ="intro_title">バドミントンのサークルです。</p>
                </div>
                <div>
                    <h2>活動内容</h2>
                    <p className="subtext">私たちのバドミントンクラブへようこそ！当クラブは、バドミントンを愛するすべての人々に開かれています。初心者から上級者まで、楽しみながら技術を向上させることを目指しています。定期的な練習や試合、イベントを通じて、仲間とともに成長し、楽しい時間を共有しましょう。
                私たちのクラブの特徴：
                定期的な練習：毎週の練習セッションで技術を磨きます。
                フレンドリーな雰囲気：新しいメンバーを歓迎し、楽しいコミュニティを形成します。
                イベントとトーナメント：さまざまなイベントやトーナメントに参加し、実践的な経験を積むことができます。
                ぜひ私たちと一緒にバドミントンを楽しみましょう！</p>
                </div>
                <div>
                    <h1>お問い合わせ</h1>   
                    <p className ="intro_title">電話番号</p>
                    <p >052-1234-5678</p>
                    <p >メール：abc@example.com</p>
                </div>
            </div>
        </div>
    );
};

export default Home;