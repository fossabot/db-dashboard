const devkey ={
    kty: "RSA",
    n: "tDhWVZIzWmhbRZUR3iO8E2ZA2L062t7qZVMCY5cYKrHIyS0GLg8JJB0LsxeTrOyLiqZXb1hcH_tVI2_ynXyQYl2YYfjQ46pa87acMFhjNGSfjNbl9hxwwVV3NwT4AmZAHizl8-OgOMy0dXcuE1hAIt73hBAVxNM-oD1nnEvmnfEZd54BjJ4Xs1Qn1ym9MHt_3jA89AsvFpTk6r7SBcldXCW0UA74Z0E8GGqH2VTryvkpuJICLdRYwjeTo4-nSZYxGKsHGAnJaVzV1CXy-CDWgrH5vPGIDSqNxvutflaAFDQ1S4nBRgM_6n2ErAps-7oGyN4tZcmMr1w20keg8iJJe4b2QXKbl-5V_vkoo68PkfLVdq27PXHXBbAYERavKtgkfMGfGwV_4I25mNHajEhNJKIGRuQenRaRksPjQATpi-xk8aYpmolvsp5PNDfYy2V1ySDdEuX85FBizgFi8JPyVARbb_6FTbXhoHVq8j-_LHRJDAZV1H8OrPcATY7rTWuijWrp-B32_hXjmUH5XUKHmU7lUHQgx4vjUejaoSs4haXD4AmWnzJFEthNQpfJ13P8uynJNv68hGdCFMY14GdfF5Wy0cQDW18co9cLMSY9Ykhh1fQXnXcGjcncKoJ6xDTa_06eWWbni4ovrRkOy3nPnI6NBuaRh74vgVFIUcMi0TU",
    e: "AQAB",
    d: "GWSrw4RlYHp-S8xgl2KFHF2myvNE0PSiZdL_re0q_k8NGc2ShphfQxulm585k17EHa3o-Xsjhe0ZtrPOJWMZDAcgksNmmYGWLatgEA7QMaBw-70G63nf6FnkwZedY2cpZycP4qDC4WX0km2PzDF93fv5N741dwWF2Dm2uObX8I65dimJEdlvwPidYXuT2Po5zuKQoBlYUe_6XlozSRXxpet5H-OwHApsz4rpJ9YHoFKhzowiKvd15y3CC4SQ_3UeZ1mn1vsACmzGg00ykkQ8PW-a3wTQVPyXO_-X10qUYuRlUwauuTD5h06WzE_uwbxZOuHVVzeCL25ImjH2C1AJ9tVSkeDD4YZ_6KSHek1ageG5vi607Bhn84pVs0aLrMK623ngyv5ZsExiud3pvU5KJAXMag5m5LvtrsJEn7LG0UVPTDtI3S6iNFpRjaqqSdpsGRCPA8hBWf09qb-SceE7JNWzq2bHrHA1SweqIajOV6C9E5OSlxXqfMwlsDg3mBEAIClXDUb6K7ApwC0rBoIyBEok75FLj6RI56BvpbmWAqSQJMbvxJSDYo7Wk0Y8FkdaE5a16Jdu6D-ZNju8w9nnDQ0ZSXB9h47fCiLgvsqS9-t8VTT7PJl48BENtDhW4y-zPJjSyEgARRfA6hkCy-U1qXmutrXKyR0WCRx03_pJoAk",
    p: "6dEINFSCe2AHD72qKsJ64KqD2MJaT2RdpDdL9vA5jltdWEq3dfLdkybstHRLDuBemEzRSjqK_RMah1fb2lk-brkpq0mnf4GH5f8JyxsuDouDsJt2qVEA1x03ENmj7bWNYa_tnQACM3gx9_b85Ob8z4xsGVJBIZPcCrlWKLS_CObrjFlRQ4g6wVgcO94g5I9IYsItUI0FnPMywNcE0n8NrZxkNGSdMcYSEB-pDo25G_JpXIG_cq57Dm35lAxsqc8IlAtBfRFTeXlto49rKnZbZCCV98v4XZD901NyExA9PPWU68n4Mb1k2Uqe2dDFPIUIrUt8tEtAtBCF22c37u7eHQ",
    q: "xVGMA7Z8r3mJiOzQAafJMqfQoVXgEarU1rEh0o9QJQrpClRpy18q8HQSuGUlkCEzBLAET0wFUwOuCoIJJdt3DQfzoJtAxFJCvb_azHD5ZPjTfHdM0TwRiGBnpQ_28jYXxxOwY3IB9PvtMtpoASr37NorJyayNq-9dvYYdFmamhcXr4b67A1QADFaFNepz5WmmjlILyej27mH55lteX5Lc4itea5NiftUzcZCdPPUrAtuGxx5anRpfWHbpITTAy883OYD5s2oNtlY7SIOtKPovMGy1SxSoAEXLLfFv3hKeX7uAXTSrvTvOUqGiCDwUUANO_P-tyoNIUeDu4UB3zEz-Q",
    dp: "1boPZ9ZAF4qlqcvTOpbfP3JeZsrxRlUWC7_IHodj9S6q2sQhgx1nUNVp1WHgIk8R6OF_Bf0Rg1ftDf5Ppv2gxhFXd40yIKlEkgZY62GC7iS1UcAp7Ydv3zKDXVG0ONuVys_HwZV6bZXXBzSr4okKWqWfQl4fzxObNepISZk-bmK2uWoDkFl8a7Ogy1C2fHZE0pFwXospsFfV8tQZQliFJkcoiYPW9OJ7LGXkYLtHk7Y4fSjU2X2IWp5IXv4kbewjiT_osuwdg5Jtl-7HJN9fltz6eLHn649Xlc5XHfngIFLTt9y8lKrs_nrpTW06faGVVuMDsMKA-JeJ5A4r4KpUOQ",
    dq: "KolZ1bMRTgK1U385mCHDjdf_cchBdY2ONHobAHlEnbesZT2tUNpDN3LOVlH3twpxJSGMzEtnGm5ApqNBtZeKIpUEQCs32xqgqKcjU89G9C1v6fUN6k04ul2N-ldmtPBUT-Y-sDFzmox0pfHPWfEZYUXm55m_8WoRPgPvYaWvXmh8AqrmjNyR0njRIo0bXlS0haqzlPbGrCdi1NqObxJ60X01aHXa4VP9BB8pVGz7-9q68b1Br2FJHG5sGxtHIfic9kHftXHAQZK5SOV-phJvqcFX-_yCE1wo0ssLJiuYYniqdkXo5S6II6GdPtta8ykLsVD4KCQ4kGQKUfJqZOMGgQ",
    qi: "KQjcVfjUPnywjlDqgvwBoy0tjYq1PMGKweA7csTGCF08Rfx18pJ8ai8GLasAy9z0MOQjZ4d5N82MTVKL_FPV7rFuBeqydZqxEWHUFa43ansPoIwVDUSF7J5bRgJbrPeEXA87syfY0F2xkb6kEE0_QkpaJmMxmvUz322W91LU-kRS5jMxFyn2pwnASdEpPW2K2kCp6cvf6WxDmCmawNw7Us78OItTCse2nE9WxffrnS2jlkY9_QbnTY1PlP3uPCIghRw8ekxwg0KlNf1gsykKs3H1CGVUVPBJC5SB-cZXEW9eL0wL3ymyl3Q2dMHhCjaTsFeYJSpepEBLJmNb-aWAtw"
}



module.exports = devkey