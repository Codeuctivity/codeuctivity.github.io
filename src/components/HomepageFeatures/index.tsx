import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Visual comparing',
    Svg: require('@site/static/img/NuGet.svg').default,
    description: (
      <>
        Compare images. One of my nuget packages.<br></br><a href="https://www.nuget.org/packages/Codeuctivity.ImageSharpCompare/">
          ImageSharp based <img src="https://img.shields.io/nuget/v/Codeuctivity.ImageSharpCompare.svg" alt="Codeuctivity.ImageSharpCompare" />
        </a><br></br>
        <a href="https://www.nuget.org/packages/Codeuctivity.SkiaSharpCompare/">
          SkiaSharp based <img src="https://img.shields.io/nuget/v/Codeuctivity.SkiaSharpCompare.svg" alt="Codeuctivity.SkiaSharpCompare" />
        </a>
      </>
    ),
  },
  {
    title: 'Encrypt your PDFs',
    Svg: require('@site/static/img/lockpdfy.svg').default,
    description: (
      <>
        Encrypt and decrypt PDFs using LockPDFy. On premise and open source. <a href="https://www.microsoft.com/store/productId/9NC5KPZM2ZRM">
          <img src="https://img.shields.io/badge/Windows%20Store-LockPDFy-green?style=flat&logo=windows" alt="Windows Store" />
        </a>
        <a href="/obtainium/redirect.html?r=obtainium%3A%2F%2Fadd%2Fhttps%3A%2F%2Fgithub.com%2Fstesee%2FPDFEncrypt">
          <img src="https://img.shields.io/badge/Obtainium-LockPDFy-green?style=flat&logo=android" alt="Obtainium" />
        </a><br></br>
        <a href="blog/Bye%20bye%20google%20play%20store">
          <img src="https://img.shields.io/badge/Google%20Play%20Store-LockPDFy-lightgrey?style=flat&logo=android" alt="Google Play Store" />
        </a>

      </>
    ),
  },
  {
    title: 'Digitalize austrian invoices',
    Svg: require('@site/static/img/bonreader.svg').default,
    description: (
      <>
        Scan QR codes on printed invoices and extract, store and export contained data.
        <a href="/obtainium/redirect.html?r=obtainium%3A%2F%2Fadd%2Fhttps%3A%2F%2Fgithub.com%2FCodeuctivity%2Fcodeuctivity.github.io"><br></br>
          <img src="https://img.shields.io/badge/Obtainium-BonReader-green?style=flat&logo=android" alt="Obtainium" />
        </a><br></br>
        <a href="blog/Bye%20bye%20google%20play%20store">
          <img src="https://img.shields.io/badge/Google%20Play%20Store-BonReaderFree-lightgrey?style=flat&logo=android" alt="Google Play Store" />
        </a>
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
