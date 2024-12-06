const express = require("express");
const axios = require("axios");

const app = express();

app.use("/", async () => {
    const INDIA_cookie = `_ga=GA1.1.291486144.1728623670; _pubcid=ae5faf16-f3a8-455b-a810-569cfa60e874; _pubcid_cst=zix7LPQsHA%3D%3D; _gcl_au=1.1.500008198.1728623671; _cc_id=1eaaa066ad7ec5003c3d6fbfa092928e; gfg_nluid=e1e50f64eadea7e82d5512749f7852a1; cto_bundle=ADlJ2F9wSVU3bHg2eExDYXBQWnB4OXFwQXJFUHR2TUFvSiUyQnJ0YlhYSkJiTG5TNzVkZjNpTSUyQmVodTIxWkRpeXNyMWM2d2ZBTUhsVllialljbk1veW55eGlFOHBOMTB0UnZQd0NpbWg3b1Rpd2FmYlZaa1R3S1g1WXBibWloNjgyNG5yZXA5M1FRdFlydG5iQ29YTVJYa2ptNThRJTNEJTNE; cto_bidid=XcvjxF8zWUVLMkQzTkdPUktCQ2pTQ2duaDFyayUyRkF2OGtaR0dJSjlPMFBpdFNxdjR5WFVyT1lHY211RGVER2V2bFlPTWJqZHN6UXZXWiUyRjRocVpHJTJGNWVhJTJGVzN2dXpiTThuUklzbGxkTkV6ak1HZWpZa3IlMkZqQVVCSVc2ZEh2SjV3cDNrQXk; __gads=ID=5b1d334f8fd65242:T=1728666873:RT=1729093976:S=ALNI_MYbqSHXLhW18BIo-Zs5-ku3u-bysg; __gpi=UID=00000f3f3c720c2b:T=1728666873:RT=1729093976:S=ALNI_MbrJkCz6gQwdyZBET4RmX97FutH2w; __eoi=ID=b6c7ba4d240e961a:T=1728666873:RT=1729093976:S=AA-AfjbwvVr3Fa333JqIGAxuqKmc; FCNEC=%5B%5B%22AKsRol82xHKwTOpcrxWAJ1l8We7LL_ay7VFzEyp242Q11Uh_7pXCbCA8qL9xmsE2Wqp91vOuzAqAty9-VObc6ph9vfwsatHGIflqGSVf3aDO0R_6kQmbnqSO9aHpnraFD18i0Bb1fh8OO-QCbkxWYOvS25mOw-W20Q%3D%3D%22%5D%5D; _ga_DWCCJLKX3X=GS1.1.1729092546.3.1.1729094254.60.0.0; gfgpromoparams={"source":"google","medium":"cpc","keyword":"gfg","campaignid":"20039445781","adgroup":"147845288105","gclid":"Cj0KCQjwveK4BhD4ARIsAKy6pMIbB6g7JJ4H0sK5xzEpkcr-jCmlgEB3nvTDoIhForYsmZxzRSk5JqoaAq_sEALw_wcB"}; _fbp=fb.1.1729704697209.626387610714525593; _clck=4ix3u1%7C2%7Cfq9%7C0%7C1745; _tguatd=eyJzYyI6Ind3dy5nb29nbGUuY29tIn0=; _tgaid=eyJnYyI6IkNqMEtDUWp3dmVLNEJoRDRBUklzQUt5NnBNSWJCNmc3Sko0SDBzSzV4ekVwa2NyLWpDbWxnRUIzbnZURG9JaEZvcllzbVp4elJTazVKcW9hQXFfc0VBTHdfd2NCIn0=; _tgpc=0dd1b0ad-147d-59b5-9193-2e75a7b63037; _tgidts=eyJzaCI6IjQ5YWIyMGQ3MmE0NTUxMDY2Mzg5YmZiMGE3YzRhZjEyIiwiY2kiOiI1ODEwMjU1ZS03MzZhLTVkNjgtYWYwMC02NDI0OGMyNjRiYWUiLCJzaSI6IkNqMEtDUWp3dmVLNEJoRDRBUklzQUt5NnBNSWJCNmc3Sko0SDBzSzV4ekVwa2NyLWpDbWxnRUIzbnZURG9JaEZvcllzbVp4elJTazVKcW9hQXFfc0VBTHdfd2NCIn0=; gfguserName=ayushagraw2fs5%2FeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmdlZWtzZm9yZ2Vla3Mub3JnXC8iLCJpYXQiOjE3Mjk3MDQ4NDQsImV4cCI6MTczNzQ4MDg0NCwiaGFuZGxlIjoiYXl1c2hhZ3JhdzJmczUiLCJ1dWlkIjoiZTIwYzY1MDQ0NzQ3OWExY2JlN2U4ZGNjOGFkOGQ5N2YiLCJwcm9maWxlVXJsIjoiaHR0cHM6XC9cL21lZGlhLmdlZWtzZm9yZ2Vla3Mub3JnXC9pbWctcHJhY3RpY2VcL3VzZXJfd2ViLTE1OTg0MzMyMjguc3ZnIiwiaW5zdGl0dXRlSWQiOjc2MSwiaW5zdGl0dXRlTmFtZSI6IkFqYXkgS3VtYXIgR2FyZyBFbmdpbmVlcmluZyBDb2xsZWdlIChBS0dFQykgR2hhemlhYmFkIiwibmFtZSI6IkF5dXNoIEFncmF3YWwiLCJpc0ludGVyZXN0U2VsZWN0ZWQiOmZhbHNlLCJwdWlkIjoidW02TVRkdzAxaXc9IiwiYWlkIjoiM2dtZVR0b1wvMkNqWGVwVT0iLCJwYSI6MX0.BeDkDDsyalxkDgvOjk7_lRREtDSzVgvTnu1rCg1S2MHHNM7RorUJNAut3dN2OaUtZNz3TST3lHVTGUu6zbCNxgOgGGWjlBEgJseH3-8fOTLE6-Lv3tMd2T3eqNSNmokPgDvOeJuO_qX1A-yAKGlfYjtXa8hVrCgPi-ecPXPsg1wcr0vkRtBgnaNTvpPC9yC7y6R5Jp_6UVgMPyjBukKZFoKtPi497b7WCeri_Rox1J3JUC8PrxWbvTRl7Re_A25rfgbsO60MXw5xTzQYbgaPQxFapJpgS3ATomjylB5mDTzm7JitLk_bna_Ecpsf7BOdJQyVvOWxFRhVRR4kgLvwCA; gfg_p=TRUE; gfg_e=65501b1c4c661261e157f7ba10e1edf443d09d6eeff43bc71868d54e7f76af18; gfg_ugen=030ef4a52619b493d3cc75d8034e3df378dae231; gfg_utype=d9c4e99a174c9471bbbff15488d37a5f4f3607ea; gfg_ugy=aee655773d856fb038536adcfd6472fc7543463e; _gcl_aw=GCL.1729704846.Cj0KCQjwveK4BhD4ARIsAKy6pMIbB6g7JJ4H0sK5xzEpkcr-jCmlgEB3nvTDoIhForYsmZxzRSk5JqoaAq_sEALw_wcB; _gcl_gs=2.1.k1$i1729704842$u114663953; _tglksd=eyJzIjoiQ2owS0NRand2ZUs0QmhENEFSSXNBS3k2cE1JYkI2ZzdKSjRIMHNLNXh6RXBrY3ItakNtbGdFQjNudlREb0loRm9yWXNtWnh6UlNrNUpxb2FBcV9zRUFMd193Y0IiLCJzdCI6MTcyOTcwNDY5NzcyNywiZyI6IkNqMEtDUWp3dmVLNEJoRDRBUklzQUt5NnBNSWJCNmc3Sko0SDBzSzV4ekVwa2NyLWpDbWxnRUIzbnZURG9JaEZvcllzbVp4elJTazVKcW9hQXFfc0VBTHdfd2NCIiwiZ3QiOjE3Mjk3MDQ2OTc3MjcsInNvZCI6Ind3dy5nb29nbGUuY29tIiwic29kdCI6MTcyOTcwNDY5NzcyNywic29kcyI6ImMiLCJzb2RzdCI6MTcyOTcwNDg0NTc2M30=; wp_geeksforgeeks={"courses":[{"course_id":628,"last_visit_time":"2024-10-23T17:34:28","visit_count":1}]}; http_referrer=https://www.google.com/; gfg_theme=gfgThemeLight; _uetsid=a8516540916411efa593a937eff04d03; _uetvid=a85157f0916411ef850e756cd4c1b11d; _tgsid=eyJscGQiOiJ7XCJscHVcIjpcImh0dHBzOi8vd3d3LmdlZWtzZm9yZ2Vla3Mub3JnJTJGY291cnNlc1wiLFwibHB0XCI6XCJDb3Vyc2VzJTIwR2Vla3Nmb3JHZWVrcyUyMCU3QyUyMEludGVyYWN0aXZlJTIwTElWRSUyMGFuZCUyMFNlbGYtUGFjZWQlMjBDb3Vyc2VzXCIsXCJscHJcIjpcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb21cIn0iLCJwcyI6Ijg5NmZkYmMxLWRmZTAtNGViMC05NTI4LWQzNGQ4MmM3ZjYwOCIsInB2YyI6IjYiLCJzYyI6IkNqMEtDUWp3dmVLNEJoRDRBUklzQUt5NnBNSWJCNmc3Sko0SDBzSzV4ekVwa2NyLWpDbWxnRUIzbnZURG9JaEZvcllzbVp4elJTazVKcW9hQXFfc0VBTHdfd2NCOi0xIiwiZWMiOiIxMSIsInB2IjoiMSIsInRpbSI6IkNqMEtDUWp3dmVLNEJoRDRBUklzQUt5NnBNSWJCNmc3Sko0SDBzSzV4ekVwa2NyLWpDbWxnRUIzbnZURG9JaEZvcllzbVp4elJTazVKcW9hQXFfc0VBTHdfd2NCOjE3Mjk3MDQ3MDA3Nzg6LTEifQ==; _clsk=1ysgd74%7C1729704959037%7C11%7C1%7Ci.clarity.ms%2Fcollect; _ga_SZ454CLTZM=GS1.1.1729704697.1.1.1729704965.10.0.2100908770`;
    // const mindset_cookie = `http_referrer=; _fbp=fb.1.1729672752548.657056425308420602; _gcl_au=1.1.100368088.1729672753; _ga=GA1.1.329107402.1729672753; _clck=d769y9%7C2%7Cfq9%7C0%7C1757; gfg_nluid=c5f07e699672428bcdbe37b9c5a485f1; authtoken=1fec007aa13f7f4e9797f06199373e93; _tgpc=fa5134d3-2b68-54cd-a67d-f2b8765821ae; gfguserName=akhilmi8x3r%2FeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmdlZWtzZm9yZ2Vla3Mub3JnXC8iLCJpYXQiOjE3Mjk2NzI4MjgsImV4cCI6MTcyOTc1OTIyOCwiaGFuZGxlIjoiYWtoaWxtaTh4M3IiLCJ1dWlkIjoiYmIxYjE5MzkwNWVmNzU5MWIxYjg1MjZiZTkyOThhMDciLCJwcm9maWxlVXJsIjoiaHR0cHM6XC9cL21lZGlhLmdlZWtzZm9yZ2Vla3Mub3JnXC9pbWctcHJhY3RpY2VcL3VzZXJfd2ViLTE1OTg0MzMyMjguc3ZnIiwiaW5zdGl0dXRlSWQiOjc2MSwiaW5zdGl0dXRlTmFtZSI6IkFqYXkgS3VtYXIgR2FyZyBFbmdpbmVlcmluZyBDb2xsZWdlIChBS0dFQykgR2hhemlhYmFkIiwibmFtZSI6IkFraGlsIiwiaXNJbnRlcmVzdFNlbGVjdGVkIjpmYWxzZSwicHVpZCI6InVtNk5SOTAzMkNVPSIsImFpZCI6IjNnbWVUdG9cLzFDblZmWkk9IiwicGEiOjF9.ibIXe994b4rw_mdODX-VDw8LDrUDDpCWoHc3BomYtAMWsubXKLyDEFpY389fsxl-h0e_U8db7pReDnFGQ7K-ANi7xMBI75ixGIFSQNFH9CnFwznYmUMw6LQRvjyvgDeT6U76ywWG5kOB2IcXaHYyJdHYoB1sZNbn0XXp-1AHFJcTVaPFEiSIqRdq69xE7Lbf3u8P2fiwsxedtNI1LPnAESg6JxZM5hag1-lOgzWii8DaWxKrqrTQJV8m0aMpNQ22ScyRH-341K2F6I6e5SIz5FNLZQsVt1SeRGoAReP6wnW0wbP16vC3lBSkdVe2I7rTrsL29bTUOmtDTKMaaVXZcQ; gfg_p=TRUE; gfg_e=a1e877bab3bba2c5793fbdb8bbd9112f22be9912beeb726e53f1c31bc66ee392; gfg_ugen=030ef4a52619b493d3cc75d8034e3df378dae231; gfg_utype=d9c4e99a174c9471bbbff15488d37a5f4f3607ea; gfg_ugy=aee655773d856fb038536adcfd6472fc7543463e; _ga_6K5G5NTXFT=GS1.1.1729682241.2.0.1729682242.0.0.0; gfg_theme=gfgThemeLight; _tguatd=eyJzYyI6ImFjY291bnRzLmdvb2dsZS5jby5pbiJ9; _tgidts=eyJzaCI6ImQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlIiwiY2kiOiJhNjMwNWI3Yi0yYTllLTViODUtOWViZS1iOGRiOGE0NmY0Y2UiLCJzaSI6ImNjNTIzOWE0LTQwOTItNTIyNi05OWE4LTMwNTVhNzczZTdkMyJ9; _tglksd=eyJzIjoiY2M1MjM5YTQtNDA5Mi01MjI2LTk5YTgtMzA1NWE3NzNlN2QzIiwic3QiOjE3Mjk2ODIyNDgwNDYsInNvZCI6ImFjY291bnRzLmdvb2dsZS5jby5pbiIsInNvZHQiOjE3Mjk2ODAzMDc4NDEsInNvZHMiOiJyIiwic29kc3QiOjE3Mjk2ODIyNDgwNDZ9; _uetsid=7ab857c0911a11ef8de507399b96b570; _uetvid=7ab8be90911a11ef875ec9da9a33e678; _clsk=ga5yi%7C1729682257638%7C4%7C0%7Ci.clarity.ms%2Fcollect; _ga_SZ454CLTZM=GS1.1.1729682247.3.1.1729682257.50.0.793958; _tgsid=eyJscGQiOiJ7XCJscHVcIjpcImh0dHBzOi8vd3d3LmdlZWtzZm9yZ2Vla3Mub3JnJTJGYmF0Y2glMkZtb25nb2RiLWRldmVsb3BlcnMtdG9vbGtpdC1jcnVkLW1hc3Rlcnktbm9kZWpzJTJGdHJhY2slMkZtb25nb2RiLXRyYW5zYWN0aW9ucyUyRnF1aXolMkZOVGsxTkRjJTI1M0RcIixcImxwdFwiOlwiUHJhY3RpY2UlMjAlN0MlMjBHZWVrc2ZvckdlZWtzJTIwJTdDJTIwQSUyMGNvbXB1dGVyJTIwc2NpZW5jZSUyMHBvcnRhbCUyMGZvciUyMGdlZWtzXCIsXCJscHJcIjpcImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvLmluXCJ9IiwicHMiOiIwYTNiZDEyMS04Yjg4LTQyZjAtOWNmZC1jNDViNGU4MTlkYWUiLCJwdmMiOiIxIiwic2MiOiJjYzUyMzlhNC00MDkyLTUyMjYtOTlhOC0zMDU1YTc3M2U3ZDM6LTEiLCJlYyI6IjMiLCJwdiI6IjEiLCJ0aW0iOiJjYzUyMzlhNC00MDkyLTUyMjYtOTlhOC0zMDU1YTc3M2U3ZDM6MTcyOTY4MjI1MTA3MzoxMCJ9`;
    const mindset_cookie = `http_referrer=https://www.google.com/; gfg_nluid=60fe846b5300e22ae18e2bce7005dca3; _gcl_au=1.1.1934646315.1729705620; _ga=GA1.1.1869612219.1729705621; _fbp=fb.1.1729705620618.553403811365186587; _clck=19si0uu%7C2%7Cfq9%7C0%7C1757; _tguatd=eyJzYyI6Ind3dy5nb29nbGUuY29tIn0=; _tgpc=54045840-5454-5c78-a45c-234290a9137a; _tgidts=eyJzaCI6ImQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlIiwiY2kiOiI0ZTYwNWE2My0wNzJjLTU3YjktOTAyMi04MjJlM2I4YTdhNGQiLCJzaSI6IjYxMzQ4NTRhLWY0MzktNWVjNS1hYjY2LWVhNDdlODFiNGZiZiJ9; authtoken=8018211d7639cad20268b07ca6cf660f; wp_geeksforgeeks={"courses":[{"course_id":628,"last_visit_time":"2024-10-23T17:46:46","visit_count":2}]}; _tglksd=eyJzIjoiNjEzNDg1NGEtZjQzOS01ZWM1LWFiNjYtZWE0N2U4MWI0ZmJmIiwic3QiOjE3Mjk3MDU2MjYyMzYsInNvZCI6Ind3dy5nb29nbGUuY29tIiwic29kdCI6MTcyOTcwNTYyNjIzNiwic29kcyI6ImMiLCJzb2RzdCI6MTcyOTcwNTY5NDYxNH0=; gfguserName=abhinav2k803%2FeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmdlZWtzZm9yZ2Vla3Mub3JnXC8iLCJpYXQiOjE3Mjk3MDU3NDIsImV4cCI6MTcyOTc5MjE0MiwiaGFuZGxlIjoiYWJoaW5hdjJrODAzIiwidXVpZCI6Ijk0NTFlMTg1NjI4ZDAyMWE5MmY0ZWVmZjY0MDJhN2VjIiwicHJvZmlsZVVybCI6Imh0dHBzOlwvXC9tZWRpYS5nZWVrc2ZvcmdlZWtzLm9yZ1wvaW1nLXByYWN0aWNlXC91c2VyX3dlYi0xNTk4NDMzMjI4LnN2ZyIsImluc3RpdHV0ZUlkIjowLCJpbnN0aXR1dGVOYW1lIjoiIiwibmFtZSI6IkFiaGluYXYgWWFkYXYiLCJpc0ludGVyZXN0U2VsZWN0ZWQiOmZhbHNlLCJwdWlkIjoidVdxSlNkbzMxQ1U9IiwiYWlkIjoiM2dtZVRkazEweXZWZjVRPSIsInBhIjoxfQ.luCh0iDOERLudvDSuNle7EulbkszrocdYbuRooIAHBlywJgoidDFoBEmxSrTuHthF0flW-JM3mlHaX5diTpHtjN3rAcgg_tKnoPuYUAT20204dpy4SBSt_4jswaSg2qIRmLFEn1iApdbhap-1VvkTpDwvWgBCanPjQcAa1HLaTcJT0rQyNSOTeQIDZ3dZk_Q_euT0IbceScg2NB5S_nOjJX1rtUL755TyS7nmZS4NPLpkiPTEvVA56lZHO2Ta-DegFJOo8ZWfeb5T1CFYRuFH1DAcueOkk8zQx7LhBE6d6rn_07qsHSDkvawUQA2PluCx7nHttZ2-kdJ26l3BM861A; gfg_p=TRUE; gfg_e=fd106e9e05683b07ff0c4e8ca777304761fface75339ad9faab71816f50513d7; gfg_ugy=aee655773d856fb038536adcfd6472fc7543463e; gfg_theme=gfgThemeLight; _uetsid=d14aa800916611efbf207339e912262b; _uetvid=d14ae660916611efa9a803d1dd7ed954; _tgsid=eyJscGQiOiJ7XCJscHVcIjpcImh0dHBzOi8vd3d3LmdlZWtzZm9yZ2Vla3Mub3JnJTJGY291cnNlcyUyRm1vbmdvZGItZGV2ZWxvcGVycy10b29sa2l0LWNydWQtbWFzdGVyeVwiLFwibHB0XCI6XCJNb25nb0RCJTIwRGV2ZWxvcGVyJ3MlMjBUb29sa2l0JTNBJTIwQ1JVRCUyME1hc3RlcnklMjB3aXRoJTIwTm9kZS5qcyUyQyUyMEphdmElMkMlMjBQeXRob24lMkMlMjBDJTIzXCIsXCJscHJcIjpcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb21cIn0iLCJwcyI6ImI5NDYxZTUwLWM0Y2YtNDA2Zi04ZGEyLWFlNGRmZTZhNWU4MCIsInB2YyI6IjciLCJzYyI6IjYxMzQ4NTRhLWY0MzktNWVjNS1hYjY2LWVhNDdlODFiNGZiZjotMSIsImVjIjoiMTQiLCJwdiI6IjEiLCJ0aW0iOiI2MTM0ODU0YS1mNDM5LTVlYzUtYWI2Ni1lYTQ3ZTgxYjRmYmY6MTcyOTcwNTYyOTI0NjotMSJ9; _clsk=18cbz93%7C1729705896634%7C10%7C1%7Ci.clarity.ms%2Fcollect; _ga_SZ454CLTZM=GS1.1.1729705620.1.1.1729705897.55.0.225895158`;


    const fetchQuestions = async (trackSlug, batchSlug, cookie) => {
        try {
            const response = await axios.get(
                `https://practiceapi.geeksforgeeks.org/api/latest/quiz/?track_slug=${trackSlug}&batch_slug=${batchSlug}`,
                {
                    headers: {
                        Cookie: cookie,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.results.DEFAULT;
        } catch (error) {
            console.error(
                "Error fetching questions:",
                error.response ? error.response.data : error.message
            );
            return null;
        }
    };

    const submitAnswer = async (
        trackSlug,
        batchSlug,
        questionId,
        response,
        cookie
    ) => {
        const payload = {
            track_slug: trackSlug,
            batch_slug: batchSlug,
            question_id: questionId,
            response: response,
        };

        try {
            const result = await axios.post(
                "https://practiceapi.geeksforgeeks.org/api/latest/quiz/submission",
                payload,
                {
                    headers: {
                        Cookie: cookie,
                        "Content-Type": "application/json",
                    },
                }
            );
            return result.data;
        } catch (error) {
            console.error(
                "Error submitting answer:",
                error.response ? error.response.data : error.message
            );
            return null;
        }
    };

    const getAllTrackSlugs = async (cookie) => {
        try {
            const result = await axios.get(
                "https://practiceapi.geeksforgeeks.org/api/latest/batch/mongodb-developers-toolkit-crud-mastery-nodejs",
                {
                    headers: {
                        cookie: cookie,
                    },
                }
            );
            const refinedResult = result.data.categories.flatMap(category =>
                category.category_details.flatMap(detail =>
                    detail.tracks.map(track => track.track_slug)
                )
            );
            console.log(refinedResult);
            // console.log(result.data);
            

            return refinedResult;
        } catch (error) {
            console.error(
                "Error fetching batch slugs:",
                error.response ? error.response.data : error.message
            );
            return null;
        }
    };

    const main = async () => {
        // get all batchSlugs

        // const batchSlug = "mongodb-developers-toolkit-crud-mastery-nodejs";
        const batchSlug = "mongodb-python";
        const totalTrackSlug = await getAllTrackSlugs(INDIA_cookie);
        // const trackSlug = totalTrackSlug[8];        

        for (trackSlug of totalTrackSlug) {

            setTimeout(() => {
                console.log("waiting for 1 seconds --------");
            }, 1000);

            // Step 1: Fetch questions
            console.log("-------------------------------------------------------");
            console.log(trackSlug);
            const questions = await fetchQuestions(
                trackSlug,
                batchSlug,
                INDIA_cookie
            );
            if (!questions) {
                console.error("No questions found.");
                return;
            }

            setTimeout(() => {
                console.log("waiting for 1 seconds");
            }, 1000);

            // print questions
            // for (const question of questions) {
            //     console.log(question.question_id);
            //     for (const ans of question.answers) {
            //         console.log(ans.id);
            //     }
            // }

            // // Step 2: Process each question
            console.log("starting guessing answers  ???????");

            for (const question of questions) {
                const questionId = question.question_id;
                // const answers = question.answers;

                // Only process Single Correct type questions
                if (question.question_type !== "Single Correct") {
                    continue;
                }
                console.log(questionId);

                const submitResult = await submitAnswer(
                    trackSlug,
                    batchSlug,
                    questionId,
                    [question.answers[0].id],
                    INDIA_cookie
                );
                // setTimeout(() => {
                //     console.log("waiting for 1 seconds");
                // }, 1000);
    

            }
            
            console.log("answer guessing finished   ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");


            console.log("starting submitting answers");
            const newData = await fetchQuestions(
                trackSlug,
                batchSlug,
                INDIA_cookie
            );
            console.log("newData fecthed");
            for (const question of newData) {
                if (question.question_type !== "Single Correct") {
                    continue;
                }
                const questionId = question.question_id;
                
                let ansId;

                for(ans of question.answers) {
                    if (ans.correct === true) {
                        ansId = ans.id;
                        break;
                    }
                }
                const submitResult2 = await submitAnswer(
                    trackSlug,
                    batchSlug,
                    questionId,
                    [ansId],
                    mindset_cookie
                );
                setTimeout(() => {
                    console.log("waiting for 1 seconds");
                }, 1000);
    
                console.log("answer submitted successfully");

            }

            
        }
    };

    main();
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
