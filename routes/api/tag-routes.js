const router = require('express').Router();
const { restart } = require('nodemon');
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: Product,
    through: ProductTag,
  })
    .then((allTagData) => res.status(200).json(allTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: Product,
    through: ProductTag,
  })
    .then((singleTagData) => {
      if (!singleTagData) {
        res.status(400).json({
          message: 'No matching tag with that id. Please enter a valid tag id.',
        });
        return;
      }
      res.status(200).json(singleTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((newTagData) => res.status(200).json(newTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTagData) => {
      if (!updatedTagData) {
        res.status(400).json({
          message:
            'No matching tags with that id. Please enter a valid tag id.',
        });
        return;
      }
      res.status(200).json(updatedTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTagData) => {
      if (!deletedTagData) {
        res.status(400).json({
          message:
            'No matching tags with that id. Please enter a valid tag id.',
        });
        return;
      }
      res.status(200).json(deletedTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
