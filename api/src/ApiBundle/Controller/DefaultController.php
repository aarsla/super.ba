<?php

namespace ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    /**
     * @Route("/api", name="api")
     */
    public function indexAction()
    {
        $response = [
            "status" => 200,
            "version" => 1.0
        ];

        return new JsonResponse([
            'api' => $response
        ], 200);
    }
}
