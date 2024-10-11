const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();


const prisma = new PrismaClient();

// Post
router.post('/addspecialgroup', async (req, res) => {
   try {
      const { name, secname } = req.body;

      if (!name || name.trim() === '') {
         return res.status(400).json({ message: 'Special group name is required' });
      }

      const specialgroup = await prisma.SpecialGroup.create({
         data: {
            name,
            SubjectCategoryID: 2,
            secname,
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

      if (!name || name.trim() === '') {
         return res.status(400).json({ message: 'Sub specialty group name is required' });
      }
      if (!SpecialGroupID) {
         return res.status(400).json({ message: 'Special group ID is required' });
      }

      const SubSpecialtyGroup = await prisma.SubSpecialtyGroup.create({
         data: {
            name,
            SpecialGroupID,
         }
      })
      res.json(SubSpecialtyGroup)
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error pose addSubSpecialtyGroup' })
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

router.post('/addspecialcourse', async (req, res) => {
   try {
      console.log(req.body);
      const {
         courseCode,
         courseNameTH,
         courseNameENG,
         prerequisiteTH,
         prerequisiteENG,
         credit,
         descriptionTH,
         descriptionENG,
         SubSpecialtyGroupID
      } = req.body
      const addspecialcorse = await prisma.SpecialCourse.create({
         data: {
            courseCode,
            courseNameTH,
            courseNameENG,
            prerequisiteTH,
            prerequisiteENG,
            credit,
            descriptionTH,
            descriptionENG,
            SubSpecialtyGroupID: parseInt(SubSpecialtyGroupID, 10)
         }
      })
      res.json(addspecialcorse)
   } catch (error) {
      console.error(error);
      res.status(500).json({ Error: 'Error post Special Course' })
   }
})

router.get('/specialcourse', async (req, res) => {
   try {
      const getspecialcorse = await prisma.SpecialCourse.findMany({})
      res.json(getspecialcorse)
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error get specialcorse ' })
   }
});

module.exports = router;