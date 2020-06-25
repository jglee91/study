export default (req, res) => {
  return res.status(200).json([
    {
      ownerName: 'jglee',
      vehicle: 'bike',
      details: "some detail about jglee's bike",
    },
    {
      ownerName: 'jglee',
      vehicle: 'car',
      details: "some detail about jglee's car",
    },
    {
      ownerName: 'jglee2',
      vehicle: 'boat',
      details: "some detail about jglee2's boat",
    },
    {
      ownerName: 'jglee2',
      vehicle: 'train',
      details: "some detail about jglee2's train",
    },
    {
      ownerName: 'jglee3',
      vehicle: 'airplane',
      details: "some detail about jglee3's airplane",
    },
  ]);
};
