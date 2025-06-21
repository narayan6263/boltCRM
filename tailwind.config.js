module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        familyFontBlack: ['Lato-Black'],
        familyFontLato: ['Lato-Regular'],
        familyFontInter: ['Inter-VariableFont_opsz,wght'],
        familyFontPLay: ['PlayfairDisplay-VariableFont_wght'],
        familyFontLatoBold: ['Lato-Bold'],
        poppinsFont: ['Poppins-Regular'],
        poppinsMedium: ['Poppins-Medium'],
        // poppins600: ['Poppins-SemiBold'], // ✅ add this for 600 weight
        poppins600s: ['Poppins-SemiBold'],
        fontPoppinRegular:['Poppins-Regular'],
        fontPoppinSemiBold:['Poppins-SemiBold'],
        fontLatoBold:['Lato-Bold'],
        fontPoppinsMedium:['Poppins-Medium'],
        // ✅ add this for 600 weight\
        fontPoppinsRegulars:['Poppins-Regular']
      },
      fontSize: {
        heading: 23,
        subHeading: 16,
        label: 14,  
        inputs: 13,
        button: 18,
        toastTitle: 16,
        toastMessage: 14,
      },
      letterSpacing: {
        minus017: '-0.17px', // ✅ add this
      },
      lineHeight: {
        snug100: '100%', // ✅ add this
      },
      colors: {
        btnBlue: '#4A90E2',
      },
    },
  },
};
