//grabbing packages
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const path = require('path')
const cTable =require('console.table');
const PORT = process.env.PORT || 3001

const app = express;
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const db = mysql.createConnection({
    host: POST,
    user: 'root',
    password: 'rootroot',
    database: 'company_db'
})