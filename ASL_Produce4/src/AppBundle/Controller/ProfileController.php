<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class ProfileController extends Controller
{
    /**
     * @Route("/profile", name="profile")
     */
    public function indexAction(Request $request)
    {
        return $this->render('profile.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            
            //
            'currentRoute' => 'profile',
        ]);
    }   
}
