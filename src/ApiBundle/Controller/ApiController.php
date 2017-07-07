<?php

namespace ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ApiController extends Controller
{
    /**
     * @Route("/api/v1/sources")
     */
    public function sourceAction()
    {
        $sources = [
            [
                "title" => "24sata info",
                "url" => "http://24sata.info",
                "logo" => "http://24sata.info/themes/tpl_4018/img/logo_24si.png"
            ],
            [
                "title" => "6yka magazin",
                "url" => "http://www.6yka.com",
                "logo" => "http://www.6yka.com/assets/public/img/logo.png"
            ],
            [
                "title" => "Aljazeera Balkans",
                "url" => "http://balkans.aljazeera.net/",
                "logo" => "http://balkans.aljazeera.net/sites/default/themes/custom/ajbalkans/logo.png"
            ],
            [
                "title" => "Avaz",
                "url" => "http://www.avaz.ba/",
                "logo" => "https://lh6.ggpht.com/tr_PgvnVcQMnGOHx0ZiUf80vnGNMZXCJPGsKF2zOW2eyAFpQ1vGtaEiBDVVPxs51I_c=w170"
            ],
            [
                "title" => "CIN",
                "url" => "https://www.cin.ba",
                "logo" => "https://www.cin.ba/wp-content/uploads/2016/09/logocin-300x246.jpg"
            ],
            [
                "title" => "Klix",
                "url" => "https://klix.ba/",
                "logo" => "https://www.klix.ba/images/logo.png"
            ],
            [
                "title" => "N1 Info",
                "url" => "http://ba.n1info.com/",
                "logo" => "http://ba.n1info.com/Images/n1-logo2.png"
            ],
            [
                "title" => "Radio Sarajevo",
                "url" => "http://radiosarajevo.ba",
                "logo" => "http://www.radiosarajevo.ba//build/img/logo-s.png"
            ]
        ];

        return new JsonResponse([
            'sources' => $sources
        ], 200);
    }

    /**
     * @Route("/api/v1/articles")
     * @param Request $request
     * @return JsonResponse
     */
    public function articleAction(Request $request)
    {
        $category = $request->query->get('category') ? $request->query->get('category') : "BiH";
        $offset = $request->query->get('offset') ? $request->query->get('offset') : 0;
        $limit = $request->query->get('limit') ? $request->query->get('limit') : 10;
        $filteredSources = $request->query->get('filters') ? $request->query->get('filters') : "WwoKXQ==";
        $searchTitle = $request->query->get('search');
        $timeStamp = $request->query->get('time');

        $em = $this->get('doctrine_mongodb');

        if ($filteredSources) {
            // "WwoKXQ==" = base64encoded [] (empty array)
            $decodedJson = base64_decode($filteredSources);
            $filteredSources = json_decode($decodedJson, true);
        }

        $articles = $em->getRepository('AppBundle:Article')->findAPISorted($category, $offset, $limit, $filteredSources, $searchTitle, $timeStamp);

        return new JsonResponse([
            'articles' => $articles
        ], 200);
    }
}
