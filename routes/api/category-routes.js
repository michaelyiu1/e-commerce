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

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Cateogry.create(req.body);
    res.status
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
