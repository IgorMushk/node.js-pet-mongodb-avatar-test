const { getMockReq, getMockRes } = require('@jest-mock/express');
const { AnimalController } = require('.');
const HttpError = require('../../common/models/HttpError');

describe('animalsController', () => {
  describe('getAnimalById', () => {
    it('returns animal with given id', async () => {
      const animal = {
        deletedAt: null,
        _id: "656b97859016ea6e07cc1390",
        name: "UzbechkaXXXX - 5",
        age: 10,
        isVaccinated: false,
        gender: "male",
        species: "cat",
        createdAt: "2023-12-02T20:45:57.901Z",
        updatedAt: "2023-12-02T20:45:57.901Z",
      };
      const req = getMockReq({
        params: {
          animalId: 'test-id',
        },
      });

      const animalsService = {
        getOneById: jest.fn().mockResolvedValue(animal),
      };

      const { res } = getMockRes();
      const animalsController = new AnimalController(animalsService);

      await animalsController.getAnimalById(req, res);

      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Successfully retrieved animal',
        data: animal,
      });
    });

    it('throws an error if animal does not exist', async () => {
      const req = getMockReq({
        params: {
          animalId: 'none',
        },
      });

      const animalsService = {
        getOneById: () => 2,
      };

      jest.spyOn(animalsService, 'getOneById').mockRejectedValue(2);

      const { res } = getMockRes();
      const animalsController = new AnimalController(animalsService);
      expect(animalsController.getAnimalById(req, res)).rejects.toThrow();
    });
  });
});
