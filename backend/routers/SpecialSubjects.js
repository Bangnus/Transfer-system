const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();


const prisma = new PrismaClient();

// Post
router.post('/addspecialgroup', async (req, res) => {
   try{ 
    const {groupID, name} =req.body
   }catch (error){
    console.error(error)
   }
});