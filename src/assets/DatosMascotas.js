import { AuditOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, FrownOutlined, HeartOutlined, HomeOutlined, MehOutlined, SmileOutlined, SolutionOutlined, StarOutlined, SyncOutlined } from "@ant-design/icons";

export const vacunasPerro = [
    'Parvovirosis (45 días)',
    'Pentavalente (60 días)',
    'Pentavalente + coronavirus (75 días)',
    'Pentavalente + coronavirus (90 días)',
    'Rabia (120 días)',
    'Tos perrera',
    'Pentavalente (90 días)',
    'Pentavalente (150 días)',
    'Pentavalente + coronavirus (120 días)',
    'Rabia (135 días)',
    'Pentavalente',
    'Polivalente (Refuerzo anual)',
    'Ninguna'
];

export const vacunasGatos = [
    'Triple Felina 90 días',
    'Triple Felina 195 días',
    'Triple Felina (Refuerzo anual)',
    'Leucemia',
    'Rabia 135 días',
    'Rabia (Refuerzo anual)',
    'Ninguna'
];

export const condiciones = [
    'Presenta fiebre',
    'Tos',
    'Secreción nasal',
    'Secreción ocular',
    'diarrea',
    'vómito',
    'decaimiento',
    'inapetencia',
    'delgadez',
    'delgadez extrema',
    'problemas dermatológicos',
    'presenta heridas',
    'presenta quemaduras',
    'presenta pulgas o garrapatas',
    'Le falta alguna extremidad',
    'perfecto estado de salud',
    'otros'
];

export const optionsMascotas = [
    {
        label: 'Perro',
        value: 'Perro',
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAW+klEQVR4nO2ceXxURbaAv7rdnX3t7AuEQIBAgEBYwr4LAsoiAoMiPhXFcZ7OjI46LsMg+pzR91zejCOioDOCKCKLgGiQTQIhYQfZwg4h6ex7IJ1033p/hARCOkl30h2c9+vvr+TWqVOn77m1nypw4sSJEydOnDhx4sSJEydOnDhx4sSJkxYg7rQBjuKAlLrK/IwgnVYJkiZFq2qUKllFzpDQ0Nw7bVtT/L9xiJTyrCqlx4HC7G+BgVIQB7hYEK0QcFSVYrdGI7/r7xeWLISQbWxuo/zbO2RfQWY7FfEcMBfwb4GKU0LwN00ln/cLD79mZ/Ns5t/WIaqU5wR0uvVZpdnE0ZK8lqoslPDiQH3YsjtZY/4tHZJSZBihqHI50M7euiVim6IRjyf6hV60t25r+MU6REp5BujcnFyZqYqTpQXE+wYBcLQkj3jfINw0WqDFtaZMSGVqYmDodlsztpZfrENuR0op0goN7wK/a4vyhMQIzE4MDF/XFuXVlduWhbWE2ppikmrRwaIc/8ZqQmO0sl8xC8HcRH34ypYqsJVfvEMAUguznkCy5E6ULSRGqTB2oD58d5uU1xaFtIa9eVkJiiBFClxvfV5bO1pZA6wlU+jU+ESfyAJHF/SLdsgJecKlrND/ANDzTtsCYtXAgLBfObwURxfQHAtB2RsX10+qqltVSEjKzp07TbVpaYWZL0gp3nJk+VJKjOUVdf9rXHToXF0tygqpjHH0yOuOOmR8XJxeqxXbTSZzPICri/bcNaWi39aDF0qSiy/768y687Rs9t0kqtnMsa3bOPj1KgyXMqmurq6X7ubuSlSP7vS9bzpdhwyqey5h/6CA8AH2tudWmh6iOBz5jlaj6TV7ag8UjWD56qMxGtV1BrBUZ9I9ibC/M0xVVax+ZQFn9h1kYP8uTBoyFi9P97r0KpOJLEMhB4+dY+VLrxI3fChTX30JFzc3BPRPLcgaNzAgfIu97arljjnk7h6xI6WUDw8fGCXaR/pSUmZESolAmnZIqaXQ8BtHlLv5nfe5ePgwi/74IHGx7RuVe2D6CJLTTvDhsu9Y/eoCZr/1FxSNBglPAg5ziOIoxU2xcMcOrYubx+KQIG+REB8GwI7dl9BpNGUuJrnGvTBrFBBh73JzL1zgUNIW5s0Z36QzahmWGMeLv53B+QOHSV5RMxURcE9a6dUAe9tWS5s6ZG9+dmJqYda/2hVkFxuvX48dM7QDGkVw8UoxJ9JzmPjcs64vp+xYC+INR5Sf8tVqgvQ+jB7ey+o8veOimXx3IsnLV1JsyAbQSZMywRH2QRs5JCU3Iya10PCtEGoqkrn71qz17BgVSHSUP1LC1l0XaN8tlt4Tx7sAYwG7d5zXSko5vn0n40b2QREKxaUVbExKY/33e7ly1fKelZQSKSUzpgzF18uVdW+8ianKCCrj7W1fLQ51yA4ptakFWa9rFM1xpJwMkH/lCpeOHSehRwgAlzKKyc0vZ8yv5yOE4wZ9R77/AamaGTuiDwBGo5HSUgMV5dl8smITX6zZ0SDPswuW8vzCz3B3c+G386dgSE9n2fzfcP7AgRGOstNhnfqBrCyP6oKsVQhxj7zlPZ/atQcXFy0do2sGUId+NhDcPpIOva1vRmxFSsnBbzcwqF8svj4eAKSfu0DXmJquoGtMIEk7L3Po6DkS4mPq8vn7eCE0Nd9sj9go/uuVufxj2SY+f+7FdpMTel2uMlb/iBTnpRDbkk6c2GcPWx1SQ45mZ3uaXNkihLjn9rQrx44SEx2MTqtQbVI5e6GAPpPvdYQZdVw8eJj8TAPjRyUAUFxSwfdbj9STGdQ3lI0/1n+nC56fzZ+enVX3f6cOYbyzaB4Lnp9NYkKX9gjxmBTyTVDT7u7R1S5flEMccl2nfgIMsZSWc+4CYcHeAOTmlWM2q0T36eMIM+o4sH4D7cID60ZWJ9MzCA/1rCfj4+3K9evXKSltehdXCEGfHh0ZMagHUt7cWBRmxcMettrdIakFmY8AsxtLv1ZahpdnzdJExbWaGbJvkMNGkZQVFHB6TwrjRyfUPTtx5iIRod4NZLt00pN28LRVeuN7dmTcqAQ6tK/pC80aTaY97LWrQ3bn5XmDeLMpGdVsprbv1txonytKSu1pRj0ObdqMViMYOeRmi5JxNQ9/P7cGsuEhnpxMv2KVXo2i8Ov/mECvbh3w1fvx2q4tT+6QstV9sl0dolVM84HQpmQ8/Xy5VmkGQO9fs2SRfyXDnmbUIVUzhzduYlhiHJ4eNxcMC4vL8fRsGCEU4O9OZnah1fpLyyrYvvsoPcePQ0hedi8ybEktKPBpjc12c4iUUoB8ojm50M6dyDKUAODn44be14P0ZMfs/ZzZs4ei3HzGj+lb77lGUVAsDLGFAClVq3Rfr6zi3cXrkRotQx98oOahZBQYtxzIympxf2I3h+wvzozHiqCEDgkJpJ/Pxmisabr69g7jaNJWzqXtt5cpdRz4+itcXbTERIfVe67Taet1yLVIKdEomiZ1mlWVlP2neWHhp5y+kM0Db/0Fd596/VGiyVV82lKb7TYPkaoyyhq5nmNGsXXJJ5w+X0J8dz39e4dzKaOYL19+ldHzHiVx+jS0LpYCDm0j89Rpzh5LJzCgYecd1S6YK1dLiGrnVz9PdjntIoPq/r92vZLdqafIzC6gvKKSoqJSTp29SqWxmpi+fZj/zu8JiLS05CZn7c3LXDkoKGKDrXa3amq8vzino9msPghyEDAUaPjrLbDuL29zPjmZJx7qg5urBrNZsmPPJfYduYqbuzs97hpL10EDiYrviYuH7bU/Mz2dtQteA2MZPt6evLOofkuamV3AOx9+w6wp3dAoNa/ArErWbjrL009MITIskIzMfN5872tyCooJDw/FPzAAv+AgfP382Jm0lfmfLME3NKQpMy5pjcTZGg3ZIofUhG8qb4OcSQuavbKCAhY//BgdI324965OdaOuopJKTp0t4vBxA8XF5SgaBVd396aV3YZqNmO8Xonez4OZU7qz5afLvPNaw64tacdBfti+nx5dAxBCcPJMIeNG9WPcyARUqfLCwn9i0rix6MP3CAoNrpd3xeJlnDfkMvG5piOSpJTPDAqM+Lst9tvcZKUVGiapUq4A6de8tGW8AwKY9Idn+XrBa0SEeNI3vmZg5u/rxuB+YQzuF0ZJWTV5+dVcN5qa0VYfqar4+mqJCPFAq238Wxk/qi8JvTpz5Ph5kHDv3eMICqgZIJ1Kv8r5Swb+uuyDBs4AGD1pPD88/p/N2iKEmAs4ziGp+ZlTpJTf2JrPEnEjh5N431R+XL8BDw8d3TrXnxz6euvw9da1tpgmCQrw4a4RDVcJcvKKAIjtGWcxX2BIEMW5BXyzcBHn9x9C0Wjo2DeBUY8/gj48/FbRfin5WbGDA8Otm21iQ3OTkpsRgxDLseNAYMIzvyFu9CjWbz7F8fR8e6ltNeqNEZhWZ/mnFuTV2Bof24WP1ixnydoV9O0Zy7+eeZbCrKx6shoFm1aGrX65ikbzIVZ22tYiFIWpL7+AotOx4YckioujGZoYac8i7Mbaf62kvLwcV1c3pj88m4/WrSCyQ1Rd+oxH5mA2m9n12edMfeWPdc+lpLst5VjlkJR8wwCQd9mi2Fo0Wi3TXnqe0pxs0g6fZPjgDqhm2/oNu2PhMMJ9D9dM/rKuXGXd8q+Y8ehDDWTuvm8yK8dP5eSuZNp168aAmdPpOnhQN1uKtsohGoU5FuZRdqOiuJgrPx9n5pShRHfoyslTx3B1aXqCZi0PTh9oFz21hLePpKy0jGXv/QOdTou3ry/THqqJn/PT+7MudTtVlUaOpO1n6fuLubTvoP1riJSOqR21pO9OQTWpjB/ZGyEU1mxKZ8qEzni6t75Tzy8ss4OF9Xn0d0/V/X0oJZVDKakkDK5xvEajwd3Tg0GjR9Cjbx+evO/BsHE9Yu/Zcvz0Jmt0N9upp2RkuANdWmi7VRjS04kI1+Pj7Ym3lztPPTqZjUnnqDZZt67UFEk7TtjBwsaJT+zPodQDrFi8lC+XfEZ1VVVdmrevD79+8feKj4/Pn63V12wNUd2kv2KHNS9TlZFdy1dy4sftFOfnERAWTq/xYxk4835Kc3IJDrw5rYmJDmPapGFs3raXyeNiWrXXHt2uBXstNhSn0WiY92zNnCTXkMPaz79i1ry5dekJgxO5fu261bHJzTpE6FzdMZutt9AC1UYjn//uDwTr/Xn1f16nfcdorl66zIqPPuWLP/wRoZpwd6+/fjVkQDcM2fnsTLnMqCFRjWhunl5xdj/11ijBYSG4uNRvZqWlEUITNPvle1XKbNvMasjuL74kWO/Pog/+my5x3XBzdyOmW1f+/N5fCPTzociQhZtbwwXF+ycPw93dh4PHDC0ue0PSUdsztWIAM21u/c3SI6n7cfdw/9na/M06JD40tAJolVOOb9nGnKcebfBcKApzf/M4xvIKXF0sd+BPPXoP2blGzlyw/WiGlBJdMyesLKGqEkVREKJ1LXVZSSlL3n6/oqy0bKG1eay1djdwv7VKzSYT25Ys5UjSFhQhKC8uoUOnjhZlO3aJwc3DAw8LNQRAEQovPD2LV9/8DB9vN0KDPC3KWaKw5DoR4UHNC95GbkEJAYH6Fvdd18orOJy6j0/e+buxvPzah0nHT31nbV6rHCKk2CSFtNohOz5ehtGQxUerP0dKyZ6tO9E1ssdRXVVFcVEpQYG+jepzd3Ph5d/P5rW3lzN1Qld8vC2f37idnNxqenSzrf+RUrLv4Gny8wqZGD/Ypry1uLq70757LCOemJfRacRdi74NbrhA2RhWOcTNJL65rpNvAY1uAJTk5rHlgw85u+8AZlM1/9y8Fv2NaJIpD85sVHfmlauYVZWQYH2TNgT4+/D0Y1P427L1/GpqHK4uzZt+6mw+M6aMa1buVrbsPMxVQyGP/v192vfqYVNeC8RITJ8D91mbwapGMj40tAIpXm8svSQ3j6Xzn6J/7x4s/fYr1qVur3NGc5w7cQqhCDpFNbnZA0DnmEgemDaS9d+fxpBbTmmZsVHZ46fLGDIgDvdGmkJL7Dt0hqUrttB/6hR7OAMAAdNSC7Ks/iqs7vESA0IXpxUa7oWGgcZbPviQ++bMYsYjc6xVV8f+Xbvp0C4YT8+GYTmW6B7bkY9X/MinKw8B4O6mo3NHPT27hRAV6UvFNRNHThTi5enNpLv6WaXz2nUjazamsH5zKjpXHROeear5TDYg4Q2sPFNitUOEEGpKScYDwqT5QUD/W9PO7jvAi6/8wUYzoby0jP3Je5l+r8Ugxwbk5ZfwxrtfUVlZRd9eYRSXVnLVUM6Fy8UcO5mDTqshOMiXWVOHM2yg5b2MWgqLyti89QCZhkKOnrhAVbUJfz9XjFKLorHPOlotAvqnFWdHW3Ndh01jwsG+7QpTCwrGgnEpMKPFFt5g45erMatmRg9tfiJ74vQV/vuDNVRXVzNhTGe6d7k5esrOq2BjUjrV1So5eSW8/9EGvtmQTERYIF5eHnh6uDJxbP+6HUGA3ftOsua7vfh5uxLbOYAh/dtz7GQ2h04XtfZnWcZkngR80JyYzYP0gQEBpcDMvXmZk4UiXgEGxPRLYOvGzcx6bG5z2eu4ePYcq5Z+zoQx/dD7N77NYjKrrFr3E2s3paL3c2PapB4NwkD9fFwpKauiz733MPTBX3Fmzx6yjx2lODeHzEs5ZFwxEOAO90weU5dHqhKdRmHqhFgiwloV21YPS7dL3DhL36mRLPVo8e7fjRCXDam5GZ3jJ979wOo333oJKXVjJ09SAoIDm8x75cJlXn38aSLD9TwwfWSjchmZefzvxxu4dCWH6Hb+TLunm8Vl+aQd55GKwrA5s/HS6+k7eTJMnlyX/l9334tUW7f8Yy2NX2IgmozorKXV27EDg9udBV6b0Ctm2Tf/XLFkxeJlo80mU6M9dFj7SKbMnklpSSn/+/qjFoevZlVl/Xd7WbU+GS93F7p0CuC+SZa3FXbuuciJ9FxmLPwTXvqmh872wJr7VeDmHSu18tWqOska/XbbH//+2LmrwCSAlILMwQpiT2OyaWvWoWgUvL0bxlztP3yGld/8xJXMfIbdfy/Hdu3F36/hRNBsVtmWfJH9RzIZ8fBDxI1y2KGmeth6jcct8suskXfICSotZLRkJ+PPb33BsZOX6NQzlnkLFhIR25Wfk1MbyGVklbJ521kKi64z8bdPkzh9auuNtpHaL7+k2sjpssJG7+u6hd9JKW8P5DorhKi31+QQhwwIiMhILcjKBaxfMwB+Pn2Z4XMeYMwTjzUpt/dABmadN/M/fpfQLjFNyjqK22vKrf9bqkVSyrsGBUZsbU6vIw99tih62ie4+cVAAQR3irbRGW1zi0i8bxCJ+rC6GnODSxkB4Q1PlVrAYQ6RsvGZqUanw2RWMVbVjy7RKAo7P/0nWxZ/jOnGVqii1WKsajhCyr10mRPbd1o1enL18KDAwlE1s1nl6MkcysprlmCEIqgoKefrBYtqz6TbzNGSPNIKDfVqiYS/zxTCqmGe4xyCeQ2NbPWEduqIVCVHj1+o9/yl385g5IAu7PtmLd/+9X8ACO7YkcuZpXXBawCdovVwrYSvF77Oqj8twmxqOmwopFM0Z66WIOTNdxITHU6HqGBOpufzyfJDZOeWE989hEH9I8k4tI/Pnvk9xoqKJrRaTZq8Zl5srbB91whuYdnb75XNe/HZ4SCib0/zDgrkwv4D7E0+RFxs+7qJYViInoRendD7ebNxzQ/Ej7+LoKgo9q7dRGVlNdFR/gghCAvxpn/vcMJCvNi97TBe/v5EdItt1BYhBMnrNhMd5kNEZM1ZkeBAX8aPSmD86AT2Hz7Lhcv59O8dQXQ7P2JjAklJPY+nv57I7jaFVd1Orllh/JCQSKvDMh3asKYWGiYipcXNmdK8PFY89wJ5l68SGRGIv+/NjaeqKhOnzmbwqzcW0m34MPauWk3S4iX4+3nQIcIHN9ebY5Hj6bn4tOvI4x81viohVZXVC1/n5E/JdOwQipeHK7f+9Lz8ErJyComK8EXR1DzPzC6n6/Dh3L/glZb+/HyhqGMT/SNt2kN2qENu3CR6COhtKd1cVc3Rrdu4cuQYVcbKemmKRsPoeTeDlzOOn2Dv6jXknjuHuar+/VZRvePrhW82YgvHt+3gwqHDGCsqUFUVw5mzqDcCODRaLWGdOyOUm6+k27Ch9Bw72ubfDew2K8wZ4h9+2daMDh96pBVmDZOSn9qiLMcjsoAloE4A0ReoCwQQEqMU7ALxcaI+dE1Lb8duk5eUWmD4FOQjbVGWAzEJwehEfXgy1AQQar1EV9WkaKTgWmWZ8eKo6OjK5pQ0R5s4ZEdurpe7xpQGtkWC24MbX651m/BNIOG5QQHh79rDpqZok+uZRgUHl6uS6YD1h8DtglilakQsiGOtUCJBLGgLZ0AbXmA2ODD8NCrjAAftANVHIL/W6kMfGuQfdsmkaoci+LYFaooEYtbAgLBG4wnsTZt3tClFmX2EKtYLaP6OvRYi4N0B+rDnhRD11jhTCwz3S+SfBTQXwVAmYalOx5v9fMLb9GjXHRn57CozBLlUyS8Aex9zKADmDwwIX9OYQM1QPCcRzBMQohdShsqaW7EKgJNIdruZlC03IjbbnDs2FK15MVn/AeKv2LgqbAEzyOVVLsoLw73DHH7vuCO543ODo9nZntd18kkh5a+lwKp951soB75UJe/actL1l8wdd0gtUkqRWpQ1GMREIRlGzX3vt5+FrwLSBaRJRJJJ1SYNDQqy/xGpO8gvxiGW2JGb6+WmMwdqhaKYjVQMDAnJudM2OXHixIkTJ06cOHHixIkTJ06cOHHixIkTJ07+7fg/vmtslIne83kAAAAASUVORK5CYII="
    },
    {
        label: 'Gato',
        value: 'Gato',
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAWfElEQVR4nO2deVhVx9nAf3NX9u0CwgUXQAFFATcENdYlIi4xq0k02ixNvxgba/Il1SRtTZpmT0ya2rSmqU1ssxg1ksS4JMaVsGhUVEREXJFNdmSHe+98fyDorSz3Apek33N/z3OfR+fMvO+c856ZM/POOwPYsWPHjh07duzYsWPHjh07duzYsWPHTjcQP3YFbMWxoiLnek1ziEkq9SBcAYSJEgXGgjrvgHNThDD82HVsj/83BtkgpbJ/RVE8JtMchJgKhAKKdjNLGhEclfCtCvFZjM4/s08r2wn/9Qb5vqTEVSmalyJYAgR0Q4QEsRtheifWU79VCGHq7Tpaw3+tQaSUIq288GHgFUDXO0JJl0r5i/GeAem9Iq8b/KQMEh8Z6eugVjyu0WhvNRiMOrVGdb66quZTV9fK9zem5tW35vu+JFevUCj/LRBTbVANA4LXKzxrX5glhjTaQH6n/GQMEj88fLyDg+P2qXMStFNmzdDqfL3JPXuebzZvqTt28HBpTX1jwncnTmSllBbGCCG3AL62rI+A/SrhMHeMl1eVLfW0o/fHZ+bw4SEOTg6Hn1v9uvuI0SNvuL7zq21yzSurChe+s+pXAWFhHwHOfVIxSbrJoEiY4OdX3Cf66EOD3DJ6tJPA9LRSpXy4vqaun0qtbtQ4aPbVVtc97e7p9ts7H1x4x133L1B2VP7tlS83GXXeTHpgkaav6nyV02o1E8a46Uv7QlmfGGT2iBGeakdt2qi4mP4LFj/oOCgkmOqqK+zdsdO07s9r6hsbmzUb9m9XO7l0/OKfycrm5WeeZ/G6f9qsnldKSriUkUn+qWyG3zwFfWgoABKSNF7+08YI0Wwz5VdR2VoBgNZJ++9pt84ZuHj5Mm1rmpunB3Pnz1NEjIxy3rzu0+bOjAEwaHAwJbl5fLP6XYqyc3Dx9iJq5kwGjxvbo7qZjEay9iWRsmET+Sez2tJ9Bg1qM4iAm5rKCl8AnumRMguweQu5OSJigKuzw6lP9mx11Gi1XRfogNqaGu6+KYG58+cRO3kipZeL+ei9fxI9dw5x99zdLZlFp8+w6Y8vUZZ7CX1YFAMiYyjPu8D5I/t56ouNaJycrs9uQirGx3n7Hej2TViAzVuIAmKGjYxs1mi1jtaW3b7pC0wmybRbZuLs4sK6HZvx7ndtcBU9bgxL5t3PiPjpuHh6WiX7YOIX7Fj9N7wDg4l/dCXeA0JAmjj+3WYipk7+T2O03IowrZZSxtpy8tjhR7Q3mBEREaXRqN709fcL8NB5KvsF+CNE+96M9hgyLBydjzefvLeW0IiheHqbz/+cnJ05c+o0iave4ciWrym9cAHf4GAcXF06lXv4y6/Z9vafCY29mQnzl+Ds0SL38rksspO/RQiByWDALyQEhdLsEQXk1dUcX/v6qqx2BfcCNuuyZkVFLdJqVWtmzrvNMf7WOaKyooKkb3dz/9JHcHbp/IH9J/V19Xz58Qbm3HMHQiHMyjfUN1BbXU1DXT1J3+0h8aPPuGPl7whqZ/gMcDollU+eXcmIKXOJnH6H2bWG2iuc3LeNK8V5FOZk4umv5743X8ZLr7+WSXA4zks/xqobsAKbGCQhMixMq3FJX73+n44Bgwa0pddU17B9YyLzHlpktcy3n3uJIUPDqaupxdNbx/TbZrebL+v4CZ5bupxH/7UWZw8Ps2tNdXWsXvggHv0GcdPCpQjR8e1XFuWR9PGfUWkULF77nlkXJkyMifXRH7b6JizAJl1WZFDwO/c8/POouCmTzPonjVbD0KjhVnVbrcRNmUTo8GFEjIoi88hxDienkZl+nMCggTg4Xvs8+fTzpeRyMRfPnmNQdJSZjJ1r3udSZhbTfvEbVBqHTvU5uLjhPySCk3u3I6UkaNS1FicF9WtfX7XD6puwAOufjCVChSImetyYdo2tUPT8HZi74C4WLH6IWxfMY/37H2AwmC9txEyIpfCkeTffUFvD4a+2MmzSbLTObhbpcfPREzz6Jo58vQ0pZVu6kMzp8U10gE0MIjFp1Rq1LUSb4ejsxKSE6Vw8e94sXaFSYDKaD4Qydu7GaDQQOs46f6Q+LJqa8nLK8wuuJQpCkisvh3S74p1gG4NImXpwX3KfrCsMixpBSNgQs7QjKT/gPzTMLC3j213oh0Sicep8Apr48jISX3mcguzjAOgCBwJQkH3aLJ/SZOjZjLQDbGKQuprql9f//YPmS+cv2kJ8p5zJymbnlm2MvvWWtjRjUzP52dkEDIvuWoCAuqpyDiZ+AIDW2Q0XT53ZLP5qxsherHYbNpkY7jiRffz553+35YlF/3PXfY88SOzkm3B1t6zfVigUtLpRmhobaWpssqhcZXk5qXuS+PxfnzJn+VO4+fi0XSs8cwZjczNe+kFdyom5/UEOJn6IyXStgfuHRpGV9D0zHnu0bWQmpQiyqGJWYpNhb1p54Swp5ZbC0zmKtPUbuZSZSUNNrUVlFUolyz94D52/H399cgXnj1u23O3k5srA6EjGL7gXXf/+ZtcOfdUyEbznD39HobL+21Zy4TTfrnmR6UseYcK9bW6aS1LIFY0G9ZYpvr41VgvtgF43SFLlRU+VUX0a8O5t2d1l/78/Jm1DIrc/8063ZRzZ+ilZSdsZOWsGc1f85vo5TBWCd4XUvhar013paV17/RuiNqpX8hMyBkD9lWo0Dla70swYNXs+EZPnkL5jJ8319ddfckfyrKQpK7U0/+YeKaGXDZJSdclLwuLelNkbVBQUonK4wVloNaW5ZxkwbFh7jkdA6hFiR0pp4a96oqN3W4hB+XPAASDa3Ydod58uCtiei0ePk/19MkHR43sk53x6MpfPZTFx0fzOsimFkKtTywu6/VL2qkGE4NbWfx+tKuFoVUlviu8WKRs24hUwiCGx07otoygnk4OJHxI5fRqhcbFdZRdIVqeVF0zsjq5eG/ZKKXOAwdenNRgNfWYUaTKSn5XNpROZXD53gcqiIuoqr1B88QJj5tzXqSPxekwmE7WVLcvndRWlnD+ayrlD3xMybjRzVzxlaXVUJsmaQ1KOtHbZt0ejrP3VhT7qZtNDUhIvEGMB157I6w55J7M4/NXXZCUl01BdjUqjwc1Xj6vOD7WDI44u7oTflIDGwm9I2qb3OXsoqe3/rjodExfOJ+b2uQgr/XBSiOXjvfzfsKaMxQaRUp4GhnSVr9rQROaVsrbvx9GqEqLdfXBQtjTG3mo159PT2f2PD7mUcQJnDy+CRk5AHx6FLvCGRSWLaaqvZfPLyxgzdxZhEybg6q3De+AAi1tXO5S6eVUERIgIy2a3WNFlCSFCAdLK8gKlUHyJZFRn+a9/6L3ZbdVWVrLtT38hc/cedIFBTFq0jP7DRkI3XPr/SVneOYzNTUQmxBMQFtZ1ga7xri7zmAl8aWkBq74hyUVFviM9vM9qFEpN65veUUvoiHqjgWPdNNDFYxlsWPkHmhubiLn9QQbHTO7J23sDvoPC0Do6kZNyoLcMAkLchxUGsabLEmnlhduAhO7Uq6ekb93OljfewmdQGBPnL8HB1d0meg4mfkBp7imWffZRb4nMj9PpAy3NbLFB0soK7pSwqaPrra3DFiOrg4lfsP1PfyFk7M8Ye9sDKBQ2cVIDkJvxA0kfr2bohDhKLubi4ulJ6MQJxNx5GypN94Im1cLBw9IYYYu7LAkrOrtuq+HtyT372PbOu4TFTWf0LZYPX7uL94CWdachAwJZ8utHqCyrIPGTz1i3Zy8L334DrbP1YcXNpqZwwKJ4LosMklJ8aTBgkwWZzig6c47NL73KwBExjLllAdjYGAAOrh6gUNA/eBAh4S2Ri6MnjGPV719i15r3ibv3bo5u30FFQSFu/XyJSpiBz8ABncpUKEwWNy2L2r5QKqdYKrC3MDQ1sukPL+Li1Y+4eQ/3yijKEhQKBQ5OLlRXmvcwDy17lCPbd/DhY8sIcHYgYdok+qmVfLDk12R8u6tTmQaTaLBUv2VdlhAjuG6Rvy9I+mg95fn5zFr6R5Sqvg14l0bDDXMZT28vblt4Dwm3z0U/oOUbPXlWPDfPncWT9y8mcMQwPP3925WnVBgs3vhjkUEk0qM7ncW5Q0c4nZqGLjCAUXNmo1RbZv+qy8Ukf/IZQyfOxL1f59sGTUYDRWeyKDx9jJqKEjz8BhAVfyfF57Lx0Pe3eIZ+vbymhnpc3W90Ojy0bMkNaQNDgpg0YxqZu/cx8b572xMpDUaH8+1daA/LuiwprH5FT+7Zx7+fXM6Z5IPsWP1XNj7/gsVlU9Z/hlKlJmLqLV3mTd+xkcy9X+Hk7kXImMkMHvszAArPnGDLqhWcTNpuFsLTFVXFhUgpuT7ArzNMJiPOLs6c2LWL0tzc9rKcmujjU22pfgs7ZlnQdR5z0jZtZtT4iXz07Tc89dLLnEpKprq06z0vDTW1HNm6gyFxN6PuIJittqKU7atXUpp7ltGz5zP9kd8ydNIsAoeNxNmzZW0sKv5OEpY8R96Jwxz4/B8WG6U0NweFQklwWGiXeaurrrDmtT8RMjSUwcGD+PBXj3P+sPl+UQHfWKT4KpYZRIgca4QC1JaWt91U/6BgAK6UlXVZ7uTefTQ3NTEkZnK715vqa9n1/qsEj57YNkTtCGdPb6Y9vJyq4kJOJW23qN55Jw4RFhmBSxcB2wAXz55n0ZJfMjlhOs++8SK/f/sVvnrtDYxN1xy8RoVpnUWKr2KRQUyIpK5z3Uh35gwndu/BLygcJ3evdq9XFuYxeNwUwsbHWyRPqdYwcf4STuzdQv2Vik7zVpcXU3gmi6mzZ1gke/ioKLNomhGjo/Hw9KDo7NnWpFMTPAOPWiTsKhYZZIKX3wkB2dYI7g7GpmZyj2eiD+s45Mk3OIxhP2s/0LojnD29GTx2Mif3be0038m9X+Pi5syUWZYZuz2UKhVNdW1r7uGppQW/tqa8xYN7kxSrrRHcHQpzcjA0NeIbFN7rskNjp3HhaJpZvNX1lFzM4eyh/Sx89GG62l7XEblnL1B4KY+A66MmBW8lVxRMslSGxQZx15W/D5zuMmMPKLmYCwoFHn4W++IsxtnTG62zC6UXb7wFQ2MDBz9fy4CQYGbOu81q2fW1dRzY9z2/f+wppi955D+DIJQKyVtSSouetcW+rAgR0ZRSkX+vMIkUrgYydIYESitr2bg+kez0QxbpKMvLx9ndE6XaNhNB30FhXDiWdkMLPJWyk8riQiqLJXNHt7zMSrWapW+9xro/vsL9K5/hnaVPcsdji4lfOJ8zxzJ4c/FS5NXWptZq8AsOIuGpxwkZM/pGxZLRqRWXZwFfd1VHq9ZDxnsGpKeVF94ppdwEdBropHZ0IC+/GP+x/XEfIoBEpMHYqfz66itonW23CiyUSnLSdhEVfxdap2ujKHdfPSBZ+vE6dP3NW+eyTesBeG7fdwAUNjbjHB7Oc3t3WqdbyjuwwCBWO4hivfy3CRRTEeJMZ/lcfXTUV1cC4OjaMhKpKS/vVHZzfQMqTfd36naFQqVGSkneySNm6f5DhqNUa8hOTrGZbpAzLcnVLY9drM4vTd0go4D/Bdp1C3j060d12WUANE6uOLq5cymj8zhdk9GIQthuH2pF/gUAcjN/MEtXabT0GzyU7OQ0m+kG/FIuXeoyfLLbLtQxen1dnE7/dpxOH6xEDBeCRQLxGwGPSyGWDxw1qrGyKI/ailKEEASEj+TE7r1mk6a+pKG6ipIL2fgGB1GUk0lTQ53Z9cDwkVzKyKChutfipm9A7app3/t4Hb3i047R+WfGeuk/itX5vxmr078z3sv/jdCY0eeUajW5GQcBCJ+YwJWSMg58vrk3VFrNiT1fodJquWvlb5FGI7nHzNeLAsKjkVKSk9azcwGi3X2I9fI3+7XGHRhkB2Pu67DZIoPGxbkwcvo0svZvo7mpAXdfPWET49n197WcO3SkawG9SFFOJqdTdzP5gUX4BgcxfNpU0r/ZYDZzd3L3wlM/gFPJqT3SdbSqhLTyQrNf62qq0aDq0ndks5McBIqLkx96gIzvdpO5ewvRCfMYOfMerlzO56PlzzBz6RLG3DrH6uAzayk+f4qkT//CoFGRxN59FwCzHl/KhfSjpG5ay5QHn2xz8QSEjyQnbSdGgwGlqv1HY0lkDVyLP7su1sDoqFJ36fW12dP45dNPBWidnWYrFAoOJG7Ay38A7r56BkaOo6GmkgOfbyBz736a61sW0xprazn4+Rc4uekYMCKmx/oNjQ1k7Erk4BfrCAgPY8GrL7UFKai1WnwGDST1s09xcHFDF9ji/FRpHTiV/C1Bo6I7XGwqaqwjr76my19RY51Z/qLG2k1rX3+rwyCRVmy2SH2gpGCMScEPUko2rnyBnAM/cNOCX+Ef2uKnKs09y8l9WynMOY6hqSWwT+voxJRfrEAXaP1uMSlN5Gb8QHVZMRUFFyjIPo6hqREPfz8m3Hs3QqlErdWg69+fwGFDAdjy5tsc27GTWctexFXXDyklia8uY8i40cx+YlmnAQ2tb35VcyNZ1eVWx6ddJac1ALEVmxlESqlIKy/MB/yaGhr4/PkXyUk7wMiZ9xA6YUZbKI+xuYma8hIa66px7xdoNmGzhtqKUr5atQKToetRXNj4OG7//dMoFEr+9sAvUWtdufmRZxFCwZFt68navw2VVsvc3zxJZHz3o+bbEByJ9fQfa8mhNTYN40gtLfgrgkehJTr9uzX/IHnDJtx9/ImOvwt9WGS39vx1hNHQhLG5E4NIKL5wmtRNfydi8kRufXo5ucdP8M9fP0F0/F1ETG45D6CuqpyMnZs5eySZR/6xBr/BwRbXoZ34tCaFiQnjfPQW+Y9sbJCicQiT2Wyr8HQO37y7hgvpR1E7OuI/eDhuPnocXd1t/oFvJT8rnYLTGaz4OhEHF2d2/vU90jYlEj3zHpRXXxApTRzZ+iljb7uFhKU3rqVbjBBL4rz8/2Zx9u5rsoy0soJ9Em5wPxefO8+p75M5c/AQVUWXqS4vx2Tou9O/1Q4OPL7hY5w9PDA2NfP+o49RlHOjN2js7bcx+4ml3VEhEfKZOK+A16wpZHODpJQVzBBgk4NafsLkI+SjcV4BW6wt2CeHYKaVFyRKifULDT9BpORZocAFyc3ASKD1I1iP5KBQiA31BuW/urt3vU8MklxRMFBh4hhgm5D1PkLAe7E6fduGzm0yR+tapXFyVKiVvXWMbJ+d25tSWnC7EHzelzoBkJQg8O4FvQcarjROnhIUZHFYaHfom4BZYLy3PlEg/9hX+q6Sj1LESCHvA3ryIL9vUDQm2NoY0IcGAYjVBTwnkFZtguwB54XROCXO0//CeK+AT02YpgLthhZ2ggFY5eZVMW2KZ1ClDep4Az/K2e+p5fkrkOIlbORLE4hUlUl15xgfn8Lr048VFTnXqUxPIFhK54f5NyHZJBWKV8d7+WXYoo4d8aMdxp9Wlj/dhFgnoMtFGyswIMVbap3f7zrbH75HSpVT2eVJJkxxCIYIcEJQLyFPmjikENpdvXGQTHf4Uf86wqHycvdmGl9Eyv8BehZqItiLkSfjfPR9u9jSy/wk/lxFckXBQKWJxyUsxLqThJolfClM4t04H/+9tqpfX/KTMEgrmTJTU1XmfpNAOR0hRwFhtPT1DoCUUCQgFykPCwVJ9aJpR199bO3YsWPHjh07duzYsWPHjh07duzYsWPHjh07duz0Dv8HpbQT8P8Tg3AAAAAASUVORK5CYII="
    }
];

export const statusAdopciones = {
    SOLICITADA: 'solicitada',
    REVISION: 'revision',
    VISITA: 'visita',
    ACEPTADA: 'aceptada',
    RECHAZADA: 'rechazada',
    CANCELADA: 'Cancelada',
    PREPARANDO_MASCOTA: 'Preparando tu mascota',
    ENTREGADA: 'Entregada'
}

export const statusesAdopciones = [
    {
        label: 'Solicitud generada',
        value: statusAdopciones.SOLICITADA,
        color: 'purple',
        icon: <CheckCircleOutlined />,
        iconSteps: <SolutionOutlined />
    },
    {
        label: 'En revisión',
        value: statusAdopciones.REVISION,
        color: 'processing',
        icon: <SyncOutlined spin />,
        iconSteps: <AuditOutlined />
    },
    {
        label: 'Visita domiciliaria agendada',
        value: statusAdopciones.VISITA,
        color: 'gold',
        icon: <ClockCircleOutlined />,
        iconSteps: <HomeOutlined />
    },
    {
        label: 'Aceptada',
        value: statusAdopciones.ACEPTADA,
        color: 'success',
        icon: <CheckCircleOutlined />,
        iconSteps: <SmileOutlined />
    },
    {
        label: 'Rechazada',
        value: statusAdopciones.RECHAZADA,
        color: 'error',
        icon: <CloseCircleOutlined />,
        iconSteps: <FrownOutlined />
    },
    {
        label: 'Cancelada',
        value: statusAdopciones.CANCELADA,
        color: 'warning',
        icon: <ExclamationCircleOutlined />,
        iconSteps: <MehOutlined />
    },
    {
        label: 'Preparando tu mascota',
        value: statusAdopciones.PREPARANDO_MASCOTA,
        color: 'success',
        icon: <ClockCircleOutlined />,
        iconSteps: <HeartOutlined />
    },
    {
        label: 'Entregada',
        value: statusAdopciones.ENTREGADA,
        color: 'success',
        icon: <CheckCircleOutlined />,
        iconSteps: <StarOutlined />
    }
];

export const statusVisita = {
    AGENDADA: 'Agendada',
    CANCELADA: 'Cancelada',
    CUMPLIDA: 'Cumplida'
}

export const statusesVisitas = [
    {
        label: 'Agendada',
        value: statusVisita.AGENDADA,
        color: 'processing',
        icon: <ClockCircleOutlined />
    },
    {
        label: 'Cancelada',
        value: statusVisita.CANCELADA,
        color: 'error',
        icon: <CloseCircleOutlined />
    },
    {
        label: 'Cumplida',
        value: statusVisita.CUMPLIDA,
        color: 'success',
        icon: <CheckCircleOutlined />
    }
];

export const statusApadrinamiento = {
    SOLICITADA: 'Solicitada',
    REVISION: 'revision',
    CANCELADA: 'Cancelada',
    ACEPTADA: 'Aceptada',
    RECHAZADA: 'Rechazada'
}

export const statusesApadrinamiento = [
    {
        label: 'Solicitada',
        value: statusApadrinamiento.SOLICITADA,
        color: 'processing',
        icon: <SolutionOutlined />
    },
    {
        label: 'En revisión',
        value: statusApadrinamiento.REVISION,
        color: 'processing',
        icon: <SyncOutlined spin />
    },
    {
        label: 'Cancelada',
        value: statusApadrinamiento.CANCELADA,
        color: 'error',
        icon: <MehOutlined />
    },
    {
        label: 'Aceptada',
        value: statusApadrinamiento.ACEPTADA,
        color: 'success',
        icon: <SmileOutlined />
    },
    {
        label: 'Rechazada',
        value: statusApadrinamiento.RECHAZADA,
        color: 'success',
        icon: <FrownOutlined />
    }
];

export const statusDarEnAdopcion = {
    POSTULADA: 'postulada',
    REVISION: 'revision',
    PUBLICADA: 'publicada',
    SOLICITADA: 'solicitada',
    GESTIONANDO: 'gestionando',
    CANCELADA: 'Cancelada',
    ACEPTADA: 'aceptada',
    PREPARANDO_MASCOTA: 'Preparando tu mascota',
    ADOPTADA: 'adoptada'
}

export const statusesDarEnAdopcion = [
    {
        label: 'Postulada para dar en adopción',
        value: statusDarEnAdopcion.POSTULADA,
        color: 'purple',
        icon: <CheckCircleOutlined />,
        iconSteps: <SolutionOutlined />
    },
    {
        label: 'Caso en revisión y estudio',
        value: statusDarEnAdopcion.REVISION,
        color: 'processing',
        icon: <SyncOutlined spin />,
        iconSteps: <AuditOutlined />
    },
    {
        label: 'La mascota ha sido publicada',
        value: statusDarEnAdopcion.PUBLICADA,
        color: 'gold',
        icon: <ClockCircleOutlined />,
        iconSteps: <HomeOutlined />
    },
    {
        label: 'Adopción solicitada',
        value: statusDarEnAdopcion.SOLICITADA,
        color: 'success',
        icon: <CheckCircleOutlined />,
        iconSteps: <SmileOutlined />
    },
    {
        label: 'Adopción en gestión',
        value: statusDarEnAdopcion.GESTIONANDO,
        color: 'processing',
        icon: <SyncOutlined spin />,
        iconSteps: <AuditOutlined />
    },
    {
        label: 'Aceptada',
        value: statusDarEnAdopcion.ACEPTADA,
        color: 'success',
        icon: <SmileOutlined />,
        iconSteps: <SmileOutlined />
    },
    {
        label: 'Cancelada',
        value: statusDarEnAdopcion.CANCELADA,
        color: 'error',
        icon: <ExclamationCircleOutlined />,
        iconSteps: <MehOutlined />
    },
    {
        label: 'Preparando tu mascota',
        value: statusDarEnAdopcion.PREPARANDO_MASCOTA,
        color: 'success',
        icon: <ClockCircleOutlined />,
        iconSteps: <HeartOutlined />
    },
    {
        label: 'Adoptada',
        value: statusDarEnAdopcion.ADOPTADA,
        color: 'success',
        icon: <CheckCircleOutlined />,
        iconSteps: <StarOutlined />
    }
];


export const tipoSolicitudes = {
    ADOPCION: 'adopcion',
    APADRINAMIENTO: 'apadrinamiento',
    VISITA: 'visita',
    DAR_ADOPCION: 'darAdopcion',
    ATENCION_HALLAZGO: 'atencionHallazgo',
    DONACION: 'donación'
}

export const tiposSolicitudes = [
    {
        label: 'Adopción',
        value: tipoSolicitudes.ADOPCION,
        color: 'lime',
        accion: 'adoptar a',
        statuses: statusesAdopciones,
        description: (title) => `Solicitó la adopción de ${title}`
    },
    {
        label: 'Apadrinamiento',
        value: tipoSolicitudes.APADRINAMIENTO,
        color: 'geekblue',
        accion: 'apadrinar a',
        statuses: statusesApadrinamiento,
        description: (title) => `Solicitó el apadrimaniento de ${title}`
    },
    {
        label: 'Visita',
        value: tipoSolicitudes.VISITA,
        color: 'blue',
        accion: 'visitar a',
        statuses: statusesVisitas,
        description: (title) => `Agendó una visita para estar con ${title}`
    },
    {
        label: 'Dar en adopción',
        value: tipoSolicitudes.DAR_ADOPCION,
        color: 'orange',
        accion: 'dar en adopción a',
        statuses: statusesDarEnAdopcion,
        description: (title) => `Ha postulado a su mascota para encontrarle un nuevo hogar ${title}`
    },
    {
        label: 'Atención de hallazgo',
        value: tipoSolicitudes.ATENCION_HALLAZGO,
        color: 'red',
        accion: 'notificar el hallazgo de'
    },
    {
        label: 'Donación',
        value: tipoSolicitudes.DONACION,
        color: 'purple',
        accion: 'donar en'
    }
];

// Filtros Mascotas
export const sizesMascotas = [
    'Pequeño',
    'Mediano',
    'Grande'
];

export const personalidadMascotas = [
    'Activo',
    'Ansioso',
    'Enérgetico',
    'Calmado',
    'Dormilon',
    'Cariñoso',
    'Jugueton',
    'Entrenado',
    'Protector',
    'Cuidador',
    'Tranquilo',
];

export const generoMascotas = [
    'Masculino',
    'Femenino'
];

export const tipoMascotas = [
    'Perro',
    'Gato'
];

export const tipoVivienda = [
    'Apartamento',
    'Casa mediana',
    'Casa grande',
    'Finca'
];

export const cuidadoEspecial = [
    'Niños',
    'Discapacitados'
];

export const presupuestoMascota = [
    'no tiene presupuesto',
    'menos del 1% SMLV',
    'entre el 1% y 5% de un SMLV',
    'entre el 6% y 10% de un SMLV',
    'entre el 11% y 50% de un SMLV',
    'más del 50% de un SMLV'
];

export const opciones = [
    'Si',
    'No'
];

export const opcionesApadrinamiento = [
    'Insumos',
    'Dinero',
    'Insumos y dinero'
]