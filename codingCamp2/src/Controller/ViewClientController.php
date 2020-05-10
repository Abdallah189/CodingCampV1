<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ViewClientController extends AbstractController
{
    /**
     * @Route("/view/client", name="view_client")
     */
    public function index()
    {
        return $this->render('view/index.html.twig', [
            'controller_name' => 'ViewClientController',
        ]);
    }
}
