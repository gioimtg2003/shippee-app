'use client';

interface IProps {
  variant: 'text' | 'image';
  width?: number;
  height?: number;
  size?: number;
}

const Logo: React.FC<IProps> = ({ variant, width, height }) => {
  const _width = width || 80;
  const _height = height || 30;
  return (
    <>
      {variant === 'text' ? (
        <svg
          width={_width}
          height={_height}
          viewBox='0 0 192 85'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M17.62 57.48C12.3 57.48 8.04 56.48 4.84 54.48C1.64 52.44 0.0400001 49.34 0.0400001 45.18C0.0400001 42.98 0.42 41.3 1.18 40.14C1.94 38.98 3.06 38.4 4.54 38.4C5.62 38.4 6.5 38.68 7.18 39.24C7.86 39.8 8.2 40.52 8.2 41.4C8.2 42.2 8.14 42.9 8.02 43.5C8.02 43.66 7.98 43.94 7.9 44.34C7.86 44.74 7.84 45.16 7.84 45.6C7.84 47.4 8.74 48.74 10.54 49.62C12.38 50.5 14.94 50.94 18.22 50.94C21.62 50.94 24.28 50.34 26.2 49.14C28.12 47.9 29.08 46.18 29.08 43.98C29.08 42.62 28.64 41.46 27.76 40.5C26.88 39.5 25.78 38.68 24.46 38.04C23.14 37.36 21.28 36.54 18.88 35.58C15.8 34.38 13.28 33.24 11.32 32.16C9.4 31.08 7.74 29.62 6.34 27.78C4.98 25.9 4.3 23.58 4.3 20.82C4.3 17.94 5.06 15.38 6.58 13.14C8.14 10.9 10.36 9.16 13.24 7.92C16.16 6.68 19.58 6.06 23.5 6.06C26.42 6.06 29.1 6.5 31.54 7.38C33.98 8.22 35.92 9.52 37.36 11.28C38.84 13.04 39.58 15.2 39.58 17.76C39.58 20.28 39.2 22.18 38.44 23.46C37.68 24.74 36.56 25.38 35.08 25.38C34.04 25.38 33.16 25.06 32.44 24.42C31.76 23.78 31.42 23.02 31.42 22.14C31.42 21.38 31.48 20.68 31.6 20.04C31.72 18.84 31.78 18.08 31.78 17.76C31.78 16.08 30.96 14.8 29.32 13.92C27.68 13.04 25.64 12.6 23.2 12.6C19.76 12.6 17.12 13.24 15.28 14.52C13.48 15.76 12.58 17.52 12.58 19.8C12.58 21.32 13.04 22.62 13.96 23.7C14.92 24.78 16.1 25.68 17.5 26.4C18.9 27.12 20.86 27.98 23.38 28.98C26.42 30.22 28.86 31.34 30.7 32.34C32.54 33.34 34.1 34.7 35.38 36.42C36.7 38.14 37.36 40.26 37.36 42.78C37.36 47.5 35.56 51.14 31.96 53.7C28.4 56.22 23.62 57.48 17.62 57.48ZM75.1956 43.62C75.7156 43.62 76.1156 43.86 76.3956 44.34C76.7156 44.82 76.8756 45.48 76.8756 46.32C76.8756 47.92 76.4956 49.16 75.7356 50.04C73.8956 52.16 71.9956 53.9 70.0356 55.26C68.1156 56.62 65.9156 57.3 63.4356 57.3C61.3956 57.3 59.8556 56.72 58.8156 55.56C57.7756 54.36 57.2556 52.64 57.2556 50.4C57.2556 49.28 57.5356 47.28 58.0956 44.4C58.6156 41.88 58.8756 40.14 58.8756 39.18C58.8756 38.54 58.6556 38.22 58.2156 38.22C57.6956 38.22 56.9556 38.9 55.9956 40.26C55.0356 41.58 54.0756 43.34 53.1156 45.54C52.1556 47.74 51.3756 50.06 50.7756 52.5C50.0156 55.7 48.1356 57.3 45.1356 57.3C43.9356 57.3 43.1356 56.88 42.7356 56.04C42.3756 55.16 42.1956 53.6 42.1956 51.36C42.1956 50.08 42.2156 49.06 42.2556 48.3L42.3156 43.5C42.3156 37.34 42.9356 30.92 44.1756 24.24C45.4556 17.56 47.3156 11.96 49.7556 7.44C52.2356 2.88 55.1956 0.599997 58.6356 0.599997C60.4756 0.599997 61.9556 1.4 63.0756 3C64.2356 4.56 64.8156 6.6 64.8156 9.12C64.8156 13.16 63.6356 17.36 61.2756 21.72C58.9156 26.04 55.0756 31.1 49.7556 36.9C49.6356 38.98 49.5756 41.12 49.5756 43.32C50.8956 39.92 52.3556 37.16 53.9556 35.04C55.5956 32.88 57.1956 31.34 58.7556 30.42C60.3556 29.5 61.8156 29.04 63.1356 29.04C65.7356 29.04 67.0356 30.34 67.0356 32.94C67.0356 34.5 66.5956 37.32 65.7156 41.4C64.9556 44.88 64.5756 47.18 64.5756 48.3C64.5756 49.9 65.1556 50.7 66.3156 50.7C67.1156 50.7 68.0556 50.22 69.1356 49.26C70.2556 48.26 71.7356 46.66 73.5756 44.46C74.0556 43.9 74.5956 43.62 75.1956 43.62ZM57.3756 6.54C56.6556 6.54 55.8556 7.58 54.9756 9.66C54.0956 11.7 53.2356 14.48 52.3956 18C51.5956 21.48 50.9356 25.28 50.4156 29.4C52.8956 26.48 54.9356 23.3 56.5356 19.86C58.1756 16.42 58.9956 13.3 58.9956 10.5C58.9956 9.22 58.8556 8.24 58.5756 7.56C58.2956 6.88 57.8956 6.54 57.3756 6.54ZM79.8728 25.08C78.1928 25.08 76.9328 24.7 76.0928 23.94C75.2528 23.14 74.8328 22.04 74.8328 20.64C74.8328 19.24 75.3728 18.08 76.4528 17.16C77.5728 16.2 78.9528 15.72 80.5928 15.72C82.0728 15.72 83.2728 16.08 84.1928 16.8C85.1128 17.52 85.5728 18.54 85.5728 19.86C85.5728 21.46 85.0528 22.74 84.0128 23.7C82.9728 24.62 81.5928 25.08 79.8728 25.08ZM79.3928 57.3C76.7928 57.3 74.8928 56.38 73.6928 54.54C72.5328 52.7 71.9528 50.26 71.9528 47.22C71.9528 45.42 72.1728 43.12 72.6128 40.32C73.0928 37.48 73.6928 34.84 74.4128 32.4C74.7728 31.12 75.2528 30.24 75.8528 29.76C76.4528 29.28 77.4128 29.04 78.7328 29.04C80.7728 29.04 81.7928 29.72 81.7928 31.08C81.7928 32.08 81.4128 34.4 80.6528 38.04C79.6928 42.44 79.2128 45.42 79.2128 46.98C79.2128 48.18 79.3728 49.1 79.6928 49.74C80.0128 50.38 80.5528 50.7 81.3128 50.7C82.0328 50.7 82.9328 50.2 84.0128 49.2C85.0928 48.2 86.5328 46.62 88.3328 44.46C88.8128 43.9 89.3528 43.62 89.9528 43.62C90.4728 43.62 90.8728 43.86 91.1528 44.34C91.4728 44.82 91.6328 45.48 91.6328 46.32C91.6328 47.92 91.2528 49.16 90.4928 50.04C86.5328 54.88 82.8328 57.3 79.3928 57.3ZM118.818 43.62C119.338 43.62 119.738 43.86 120.018 44.34C120.338 44.82 120.498 45.48 120.498 46.32C120.498 47.92 120.118 49.16 119.358 50.04C117.638 52.16 115.778 53.9 113.778 55.26C111.818 56.62 109.578 57.3 107.058 57.3C104.938 57.3 103.218 56.54 101.898 55.02C99.6184 56.5 97.2384 57.26 94.7584 57.3C94.2384 65.02 93.0584 71.46 91.2184 76.62C89.3784 81.82 86.6784 84.42 83.1184 84.42C80.9584 84.42 79.3584 83.64 78.3184 82.08C77.2784 80.52 76.7584 78.36 76.7584 75.6C76.7584 71.68 77.6584 67.1 79.4584 61.86C81.2584 56.66 84.0384 50.92 87.7984 44.64C87.7984 38.8 87.7584 34.74 87.6784 32.46C87.6384 31.3 88.0984 30.38 89.0584 29.7C90.0184 29.02 91.2184 28.68 92.6584 28.68C93.4984 28.68 94.0984 28.86 94.4584 29.22C94.8584 29.54 95.0784 30.2 95.1184 31.2C95.1184 32.2 95.1384 32.94 95.1784 33.42C96.4584 31.82 97.7184 30.68 98.9584 30C100.198 29.28 101.518 28.92 102.918 28.92C105.158 28.92 106.978 29.82 108.378 31.62C109.818 33.42 110.538 35.78 110.538 38.7C110.538 40.82 110.198 42.88 109.518 44.88C108.838 46.88 107.898 48.7 106.698 50.34C107.538 50.58 108.238 50.7 108.798 50.7C110.118 50.7 111.378 50.22 112.578 49.26C113.778 48.3 115.318 46.7 117.198 44.46C117.678 43.9 118.218 43.62 118.818 43.62ZM95.0584 51.54C96.4984 51.22 97.8184 50.44 99.0184 49.2C100.258 47.92 101.238 46.36 101.958 44.52C102.678 42.64 103.038 40.68 103.038 38.64C103.038 37.44 102.798 36.54 102.318 35.94C101.838 35.3 101.198 34.98 100.398 34.98C98.9584 34.98 97.2184 36.5 95.1784 39.54C95.1384 41.3 95.1184 43.88 95.1184 47.28C95.1184 49.12 95.0984 50.54 95.0584 51.54ZM83.5984 78.54C84.6784 78.54 85.5784 76.18 86.2984 71.46C87.0184 66.78 87.4784 60.94 87.6784 53.94C85.9584 57.94 84.5984 61.76 83.5984 65.4C82.5984 69.04 82.0984 72.1 82.0984 74.58C82.0984 75.86 82.2584 76.84 82.5784 77.52C82.8584 78.2 83.1984 78.54 83.5984 78.54ZM147.705 43.62C148.225 43.62 148.625 43.86 148.905 44.34C149.225 44.82 149.385 45.48 149.385 46.32C149.385 47.92 149.005 49.16 148.245 50.04C146.525 52.16 144.665 53.9 142.665 55.26C140.705 56.62 138.465 57.3 135.945 57.3C133.825 57.3 132.105 56.54 130.785 55.02C128.505 56.5 126.125 57.26 123.645 57.3C123.125 65.02 121.945 71.46 120.105 76.62C118.265 81.82 115.565 84.42 112.005 84.42C109.845 84.42 108.245 83.64 107.205 82.08C106.165 80.52 105.645 78.36 105.645 75.6C105.645 71.68 106.545 67.1 108.345 61.86C110.145 56.66 112.925 50.92 116.685 44.64C116.685 38.8 116.645 34.74 116.565 32.46C116.525 31.3 116.985 30.38 117.945 29.7C118.905 29.02 120.105 28.68 121.545 28.68C122.385 28.68 122.985 28.86 123.345 29.22C123.745 29.54 123.965 30.2 124.005 31.2C124.005 32.2 124.025 32.94 124.065 33.42C125.345 31.82 126.605 30.68 127.845 30C129.085 29.28 130.405 28.92 131.805 28.92C134.045 28.92 135.865 29.82 137.265 31.62C138.705 33.42 139.425 35.78 139.425 38.7C139.425 40.82 139.085 42.88 138.405 44.88C137.725 46.88 136.785 48.7 135.585 50.34C136.425 50.58 137.125 50.7 137.685 50.7C139.005 50.7 140.265 50.22 141.465 49.26C142.665 48.3 144.205 46.7 146.085 44.46C146.565 43.9 147.105 43.62 147.705 43.62ZM123.945 51.54C125.385 51.22 126.705 50.44 127.905 49.2C129.145 47.92 130.125 46.36 130.845 44.52C131.565 42.64 131.925 40.68 131.925 38.64C131.925 37.44 131.685 36.54 131.205 35.94C130.725 35.3 130.085 34.98 129.285 34.98C127.845 34.98 126.105 36.5 124.065 39.54C124.025 41.3 124.005 43.88 124.005 47.28C124.005 49.12 123.985 50.54 123.945 51.54ZM112.485 78.54C113.565 78.54 114.465 76.18 115.185 71.46C115.905 66.78 116.365 60.94 116.565 53.94C114.845 57.94 113.485 61.76 112.485 65.4C111.485 69.04 110.985 72.1 110.985 74.58C110.985 75.86 111.145 76.84 111.465 77.52C111.745 78.2 112.085 78.54 112.485 78.54ZM171.312 43.62C171.832 43.62 172.232 43.86 172.512 44.34C172.832 44.82 172.992 45.48 172.992 46.32C172.992 47.92 172.612 49.16 171.852 50.04C170.372 51.84 168.272 53.5 165.552 55.02C162.872 56.54 159.992 57.3 156.912 57.3C152.712 57.3 149.452 56.16 147.132 53.88C144.812 51.6 143.652 48.48 143.652 44.52C143.652 41.76 144.232 39.2 145.392 36.84C146.552 34.44 148.152 32.54 150.192 31.14C152.272 29.74 154.612 29.04 157.212 29.04C159.532 29.04 161.392 29.74 162.792 31.14C164.192 32.5 164.892 34.36 164.892 36.72C164.892 39.48 163.892 41.86 161.892 43.86C159.932 45.82 156.592 47.38 151.872 48.54C152.872 50.38 154.772 51.3 157.572 51.3C159.372 51.3 161.412 50.68 163.692 49.44C166.012 48.16 168.012 46.5 169.692 44.46C170.172 43.9 170.712 43.62 171.312 43.62ZM156.192 34.92C154.712 34.92 153.452 35.78 152.412 37.5C151.412 39.22 150.912 41.3 150.912 43.74V43.86C153.272 43.3 155.132 42.46 156.492 41.34C157.852 40.22 158.532 38.92 158.532 37.44C158.532 36.68 158.312 36.08 157.872 35.64C157.472 35.16 156.912 34.92 156.192 34.92ZM189.587 45.42C190.107 45.42 190.507 45.66 190.787 46.14C191.107 46.62 191.267 47.28 191.267 48.12C191.267 49.56 190.927 50.8 190.247 51.84C189.127 53.56 187.647 54.9 185.807 55.86C184.007 56.82 181.847 57.3 179.327 57.3C175.487 57.3 172.507 56.16 170.387 53.88C168.267 51.56 167.207 48.44 167.207 44.52C167.207 41.76 167.787 39.2 168.947 36.84C170.107 34.44 171.707 32.54 173.747 31.14C175.827 29.74 178.167 29.04 180.767 29.04C183.087 29.04 184.947 29.74 186.347 31.14C187.747 32.5 188.447 34.36 188.447 36.72C188.447 39.48 187.447 41.86 185.447 43.86C183.487 45.82 180.127 47.38 175.367 48.54C176.327 50.38 177.947 51.3 180.227 51.3C181.867 51.3 183.207 50.92 184.247 50.16C185.327 49.4 186.567 48.12 187.967 46.32C188.447 45.72 188.987 45.42 189.587 45.42ZM179.747 34.92C178.267 34.92 177.007 35.78 175.967 37.5C174.967 39.22 174.467 41.3 174.467 43.74V43.86C176.827 43.3 178.687 42.46 180.047 41.34C181.407 40.22 182.087 38.92 182.087 37.44C182.087 36.68 181.867 36.08 181.427 35.64C181.027 35.16 180.467 34.92 179.747 34.92Z'
            fill='#6366F1'
          />
        </svg>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src='logo.svg' alt='Logo' />
      )}
    </>
  );
};

export default Logo;
