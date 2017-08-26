<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\ButtonType;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Email as EmailConstraint;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

use Symfony\Component\HttpFoundation\Session\Session;
 
class SessionController extends Controller
{
    /**
     * @Route("/login", name="login")
     */
    public function indexAction(Request $request)
    {
        return $this->render('login.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            
            //
            'currentRoute' => 'login',
        ]);
    }

    /**
    * @Route("/login/loginForm", name="loginForm")
    */
    public function loginForm(Request $request) {
        $client= new \Google_Client();
        $client->setApplicationName('ASL');
        $client->addScope('profile');
        $client->setClientId('968430833230-drlurhnnr8cacqhv0qddrkrkapv9k0hi.apps.googleusercontent.com');
        $client->setClientSecret('4lR9mpsZY_GWChYRWSqKEs3B');
        $client->setRedirectUri('http://127.0.0.1:8002/profile');
        $url= $client->createAuthUrl();
      
        $form = $this->createFormBuilder(null)
            ->setAction($this->generateUrl("loginForm"))
            ->add("email", TextType::class, array("required"=>false, "constraints"=>[new EmailConstraint(array("message"=>"Email in wrong format")), new NotBlank(array("message"=>"Can not be blank"))]))
            ->add("password", TextType::class, array("required"=>false, "constraints"=>[new NotBlank(array("message"=>"Can not be blank"))]))
            ->add("save", SubmitType::class, array('label' => 'Login'))
            ->add("google", SubmitType::class, array('label' => 'Login with Google'))
            ->getForm();
        
        $form->handleRequest($request);
        
        if($request->isMethod("POST")){
            if($form->get('google')->isClicked()){
                return $this->redirect($url);

                $client= new \Google_Client();
                $client->setApplicationName('ASL');
                $client->setClientId('');
                $client->setClientSecret('');
                $client->setRedirectUri('http://127.0.0.1:8002/profile');
                $service = new \Google_Service_Oauth2($client);
                $code=$client->authenticate($request->query->get('code'));
                $client->setAccessToken($code);
                $userDetails=$service->userinfo->get();
            } else if($form->isValid()){
                return $this->render('loginDone.html.twig', [
                    'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,

                    //
                    'currentRoute' => 'loginDone',
                ]);
            }
        }
        
        return $this->render('login.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            
            //
            'currentRoute' => 'login',
            'form' => $form -> createView(),
        ]);
    }
}