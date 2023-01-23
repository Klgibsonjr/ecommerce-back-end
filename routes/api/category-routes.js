const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    // attributes: ['id', 'category_name'],
    attributes: ['id', 'category_name'],
    include: Product,
  })
    .then((allCategoryData) => res.status(200).json(allCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'category_name'],
    include: Product,
  })
    .then((singleCategoryData) => {
      if (!singleCategoryData) {
        res.status(400).json({
          message: 'No matching categories, please enter a valid category id.',
        });
        return;
      }
      res.status(200).json(singleCategoryData);
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCategoryData) => res.status(200).json(newCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategoryData) => {
      if (!updatedCategoryData) {
        res.status(400).json({
          message:
            'No matching categories with that id. Please enter a valid category id.',
        });
        return;
      }
      res.status(200).json(updatedCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCatagoryData) => {
      if (!updatedCategoryData) {
        res.status(400).json({
          message:
            'No matching categories with that id. Please enter a valid category id.',
        });
        return;
      }
      res.status(200).json(deletedCatagoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
