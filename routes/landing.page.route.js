import { Router } from 'express';
const router = Router();
import protectRoutes from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';
import { uploadSingleFile } from '../middleware/uploadFileMiddleWare.js';
import {
  addSectionFiveValidator,
  addSectionOneValidator,
  addSectionSevenValidator,
  addSectionSixValidator,
  addSectionThreeValidator,
  deleteFromSectionFiveValidator,
  deleteFromSectionOneValidator,
  deleteFromSectionSevenValidator,
  deleteFromSectionSixValidator,
  deleteFromSectionThreeValidator,
  addArrSectionFourValidator,
  addSectionFourValidator,
  deleteEleFromSectionFourValidator,
  updateSectionFourValidator,
} from '../utils/validators/landing.page.validator.js';
import {
  addSectionFive,
  addSectionOne,
  addSectionSeven,
  addSectionSix,
  addSectionThree,
  deleteFromSectionFive,
  deleteFromSectionOne,
  deleteFromSectionSeven,
  deleteFromSectionSix,
  deleteFromSectionThree,
  getLandingPage,
  getSectionFive,
  getSectionOne,
  getSectionSeven,
  getSectionSix,
  getSectionThree,
  getSpecificSectionFive,
  updateSectionFive,
  addArrSectionFour,
  addSectionFour,
  deleteEleFromSectionFour,
  updateEleFromSectionFour,
  deleteFromSectionFour,
  getSectionFour,
  updateArrFromSectionFour,
  updateSectionOne,
  updateSectionThree,
  updateSectionSix,
  updateSectionSeven
} from '../controller/landing.page.controller.js';

router.post(
  '/section-one',
  protectRoutes,
  allowTo('admin'),
  uploadSingleFile('image', 'landing-page/section-one', 'image'),
  addSectionOneValidator,
  addSectionOne
);
router.patch(
  '/section-one/update/:id',
  protectRoutes,
  allowTo('admin'),
  uploadSingleFile('image', 'landing-page/section-one', 'image'),
  deleteFromSectionOneValidator,
  updateSectionOne
);
router.delete(
  '/section-one/:id',
  protectRoutes,
  allowTo('admin'),
  deleteFromSectionOneValidator,
  deleteFromSectionOne
);
router.get(
  '/section-one',
  protectRoutes,
  allowTo('admin'),
  getSectionOne
);

router.post(
  '/section-three',
  protectRoutes,
  allowTo('admin'),
  addSectionThreeValidator,
  addSectionThree
);
router.patch(
  '/section-three/update/:id',
  protectRoutes,
  allowTo('admin'),
  deleteFromSectionThreeValidator,
  updateSectionThree
);
router.delete(
  '/section-three/:id',
  protectRoutes,
  allowTo('admin'),
  deleteFromSectionThreeValidator,
  deleteFromSectionThree
);
router.get(
  '/section-three',
  protectRoutes,
  allowTo('admin'),
  getSectionThree
)

router.post(
  '/section-four',
  protectRoutes,
  allowTo('admin'),
  addSectionFourValidator,
  addSectionFour
);

router.patch(
  '/section-four/add-to-arr',
  protectRoutes,
  allowTo('admin'),
  addArrSectionFourValidator,
  addArrSectionFour
);

router.patch(
  '/section-four/update-ele',
  protectRoutes,
  allowTo('admin'),
  deleteEleFromSectionFourValidator,
  updateEleFromSectionFour
);

router.patch(
  '/section-four/update-from-arr',
  protectRoutes,
  allowTo('admin'),
  updateSectionFourValidator,
  updateArrFromSectionFour
);

router.delete(
  '/section-four/delete-from-arr',
  protectRoutes,
  allowTo('admin'),
  updateSectionFourValidator,
  deleteFromSectionFour
);

router.delete(
  '/section-four/delete-ele',
  protectRoutes,
  allowTo('admin'),
  deleteEleFromSectionFourValidator,
  deleteEleFromSectionFour
);

router.get(
  '/section-four',
  protectRoutes,
  allowTo('admin'),
  getSectionFour
);

router.post(
  '/section-five',
  protectRoutes,
  allowTo('admin'),
  uploadSingleFile('image', 'landing-page/section-five', 'image'),
  addSectionFiveValidator,
  addSectionFive
);
router.delete(
  '/section-five/:id',
  protectRoutes,
  allowTo('admin'),
  deleteFromSectionFiveValidator,
  deleteFromSectionFive
);
router.patch(
  '/section-five/:id',
  protectRoutes,
  allowTo('admin'),
  uploadSingleFile('image', 'landing-page/section-five', 'image'),
  deleteFromSectionFiveValidator,
  updateSectionFive
);
router.get(
  '/section-five',
  protectRoutes,
  allowTo('admin'),
  getSectionFive
);
router.get(
  '/section-five/:id',
  protectRoutes,
  allowTo('admin'),
  deleteFromSectionFiveValidator,
  getSpecificSectionFive
);

router.post(
  '/section-six',
  protectRoutes,
  allowTo('admin'),
  uploadSingleFile('image', 'landing-page/section-six', 'image'),
  addSectionSixValidator,
  addSectionSix
);
router.patch(
  '/section-six/update/:id',
  protectRoutes,
  allowTo('admin'),
  uploadSingleFile('image', 'landing-page/section-six', 'image'),
  deleteFromSectionSixValidator,
  updateSectionSix
);
router.delete(
  '/section-six/:id',
  protectRoutes,
  allowTo('admin'),
  deleteFromSectionSixValidator,
  deleteFromSectionSix
);
router.get(
  '/section-six',
  protectRoutes,
  allowTo('admin'),
  getSectionSix
);

router.post(
  '/section-seven',
  protectRoutes,
  allowTo('admin'),
  addSectionSevenValidator,
  addSectionSeven
);
router.patch(
  '/section-seven/update/:id',
  protectRoutes,
  allowTo('admin'),
  deleteFromSectionSevenValidator,
  updateSectionSeven
);
router.delete(
  '/section-seven/:id',
  protectRoutes,
  allowTo('admin'),
  deleteFromSectionSevenValidator,
  deleteFromSectionSeven
);
router.get(
  '/section-seven',
  protectRoutes,
  allowTo('admin'),
  getSectionSeven
); 

router.get(
  '/all',
  getLandingPage
);


export default router;
