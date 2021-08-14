const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

async function connectDatabase(){
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  return db
}

async function main(){
  await connectDatabase()
  const app = require('./app')
}

main()
