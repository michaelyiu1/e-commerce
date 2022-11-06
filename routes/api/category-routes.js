const router = require('express').Router();
const { Category, Product } = require('../../models');

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500),json(err);
  }
});


// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
 try {
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product, through: ProductTag, as: 'category_products'}]
  });

  if(!categoryData) {
    res.status(404).json({ message: 'No category found with this id!'});
    return;
  }

  res.status(200).json(categoryData);
 } catch(err) {
  res.status(500).json(err);
 }
 
});


// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});

  // update a category by its `id` value
router.put('/:id', async (req, res) => {

  try{
    const category = await Category.findByPk(req.params.id);
    category.id = req.body;
  } catch(err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({message: 'No category with this id found'})
    };

    res.status(200).json(categeoryData);
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
