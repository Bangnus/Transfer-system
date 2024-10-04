const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();


const prisma = new PrismaClient();

// Post
router.post('/addspecialgroup', async (req, res) => {
   try {
      const { name } = req.body;

      const specialgroup = await prisma.SpecialGroup.create({
         data: {
            name,
            SubjectCategoryID: 2
         }
      })
      res.json(specialgroup);
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error creating special group.' });
   }
});

// get
router.get('/allspecialgroup', async (req, res) => {
   try {
      const allspecialgroup = await prisma.SpecialGroup.findMany({

      })
      res.json(allspecialgroup)
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Eror get special group.' });
   }
})

// post
router.post('/addSubSpecialtyGroup', async (req, res) => {
   try {
      const { name, SpecialGroupID } = req.body;

      const SubSpecialtyGroup = await prisma.SubSpecialtyGroup.create({
         data: {
            name,
            SpecialGroupID
         }
      })
      res.json(SubSpecialtyGroup)
   } catch (error) {

   }
})
router.get('/allSubSpecialtyGroup', async (req, res) => {
   try {
      const allSubSpecialtyGroup = await prisma.SubSpecialtyGroup.findMany({

      })
      res.json(allSubSpecialtyGroup);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error get SubSpecial Group' })
   }
})


module.exports = router;