import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './schemas/heroType'
import { pageType } from './schemas/pageType'
import { textSingleType } from './schemas/textSingleType'
import { textAndImageType } from './schemas/textAndImageType'
import { featureType } from './schemas/featureType'
import { postType } from './schemas/postType'
import settingsType  from './schemas/settingsSubType'
import { authorType } from './schemas/authorType'
import { carouselType } from './schemas/carouselType'
import colorsSubType from './schemas/colorsSubType'
import footerSubType from './schemas/footerSubType'
import navSubType from './schemas/navSubType'
import contactSubType from './schemas/contactSubType'
import metaDataSubType from './schemas/metaDataSubType'
import settingsSubType from './schemas/settingsSubType'
import { textAndFormType } from './schemas/textAndFormType'
import { postsListType } from './schemas/postsListType'
import { imageFullType } from './schemas/imageFullType'
import { twoColumnsType } from './schemas/twoColumnsType'
import { threeColumnsType } from './schemas/threeColumnsType'
import { contactInfoType } from './schemas/contactType'
import { donateType } from './schemas/donateType'
import { heroTextType } from './schemas/heroTextType'




export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, heroTextType, contactSubType, donateType, contactInfoType, threeColumnsType, twoColumnsType, imageFullType, postsListType, textAndFormType, metaDataSubType, settingsSubType, footerSubType, navSubType, pageType, heroType,carouselType, textSingleType, textAndImageType, featureType],
}
